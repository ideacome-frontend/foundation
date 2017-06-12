var ResultFuture = (function () {
    function ResultFuture() {
    }
    ResultFuture.prototype.success = function (cb) {
        this.successCallback = cb;
        return this;
    };
    ResultFuture.prototype.failure = function (cb) {
        this.failureCallback = cb;
        return this;
    };
    ResultFuture.prototype._invokeSuccess = function (data) {
        this.successCallback && this.successCallback(data);
    };
    ResultFuture.prototype._invokeFailure = function (reason) {
        this.failureCallback && this.failureCallback(reason);
    };
    return ResultFuture;
}());
export { ResultFuture };
var WXBBridge = (function () {
    function WXBBridge() {
        var _this = this;
        this.resultFutures = {};
        this.eventHandlers = {};
        this.id = 0;
        this.hostInfo = {};
        if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.wxbbridge) {
            this.doSend = function (command, params, commandId) {
                window['webkit'].messageHandlers.wxbbridge.postMessage({ command: command, params: params, commandId: commandId });
            };
            this.hostInfo = window['__wxb_host_info'];
        }
        else if (window['wxbbridgeandroid']) {
            this.doSend = function (command, params, commandId) {
                window['wxbbridgeandroid'].handleCommand(JSON.stringify({ command: command, params: params, commandId: commandId }));
            };
            try {
                this.hostInfo = JSON.parse(window['wxbbridgeandroid'].getHostInfo());
            }
            catch (e) {
            }
        }
        else {
            this.doSend = function (command, params, commandId) {
                _this._notifyFailure({ commandId: commandId, reason: 'error not inside app' });
            };
        }
    }
    WXBBridge.prototype.getHostInfo = function () {
        return JSON.parse(JSON.stringify(this.hostInfo));
    };
    WXBBridge.prototype.sendCommand = function (command, params) {
        var key = command + "_" + this.id++;
        var r = new ResultFuture();
        this.resultFutures[key] = r;
        this.doSend(command, params || {}, key);
        return r;
    };
    WXBBridge.prototype.on = function (event, callback) {
        var cbs = this.eventHandlers[event] || [];
        cbs.push(callback);
        this.eventHandlers[event] = cbs;
    };
    WXBBridge.prototype.off = function (event, callback) {
        if (callback) {
            var cbs = this.eventHandlers[event] || [];
            var idx = cbs.indexOf(callback);
            if (idx >= 0) {
                cbs.splice(idx, 1);
            }
        }
        else {
            delete this.eventHandlers[event];
        }
    };
    WXBBridge.prototype._postResponse = function (_a) {
        var commandId = _a.commandId, response = _a.response;
        var r = this.resultFutures[commandId];
        setTimeout(function () { r && r._invokeSuccess(response); }, 0);
        delete this.resultFutures[commandId];
    };
    WXBBridge.prototype._notifyFailure = function (_a) {
        var commandId = _a.commandId, reason = _a.reason;
        var r = this.resultFutures[commandId];
        setTimeout(function () { r && r._invokeFailure(reason); }, 0);
        delete this.resultFutures[commandId];
    };
    WXBBridge.prototype._postEvent = function (_a) {
        var name = _a.name, data = _a.data;
        var cbs = this.eventHandlers[name];
        if (cbs) {
            setTimeout(function () { cbs.forEach(function (fn) { fn(data); }); }, 0);
        }
    };
    return WXBBridge;
}());
export { WXBBridge };
var bridge = new WXBBridge();
window['wxbBridge'] = bridge;
export default bridge;
