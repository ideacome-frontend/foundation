export class ResultFuture {
    success(cb) {
        this.successCallback = cb;
        return this;
    }
    failure(cb) {
        this.failureCallback = cb;
        return this;
    }
    _invokeSuccess(data) {
        this.successCallback && this.successCallback(data);
    }
    _invokeFailure(reason) {
        this.failureCallback && this.failureCallback(reason);
    }
}
export class WXBBridge {
    constructor() {
        this.resultFutures = {};
        this.eventHandlers = {};
        this.id = 0;
        this.hostInfo = {};
        if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.wxbbridge) {
            this.doSend = (command, params, commandId) => {
                window['webkit'].messageHandlers.wxbbridge.postMessage({ command, params, commandId });
            };
            this.hostInfo = window['__wxb_host_info'];
        }
        else if (window['wxbbridgeandroid']) {
            this.doSend = (command, params, commandId) => {
                window['wxbbridgeandroid'].handleCommand(JSON.stringify({ command, params, commandId }));
            };
            try {
                this.hostInfo = JSON.parse(window['wxbbridgeandroid'].getHostInfo());
            }
            catch (e) {
            }
        }
        else {
            this.doSend = (command, params, commandId) => {
                this._notifyFailure({ commandId, reason: 'error not inside app' });
            };
        }
    }
    getHostInfo() {
        return JSON.parse(JSON.stringify(this.hostInfo));
    }
    sendCommand(command, params) {
        let key = `${command}_${this.id++}`;
        let r = new ResultFuture();
        this.resultFutures[key] = r;
        this.doSend(command, params || {}, key);
        return r;
    }
    on(event, callback) {
        let cbs = this.eventHandlers[event] || [];
        cbs.push(callback);
        this.eventHandlers[event] = cbs;
    }
    off(event, callback) {
        if (callback) {
            let cbs = this.eventHandlers[event] || [];
            let idx = cbs.indexOf(callback);
            if (idx >= 0) {
                cbs.splice(idx, 1);
            }
        }
        else {
            delete this.eventHandlers[event];
        }
    }
    _postResponse({ commandId, response }) {
        let r = this.resultFutures[commandId];
        setTimeout(() => { r && r._invokeSuccess(response); }, 0);
        delete this.resultFutures[commandId];
    }
    _notifyFailure({ commandId, reason }) {
        let r = this.resultFutures[commandId];
        setTimeout(() => { r && r._invokeFailure(reason); }, 0);
        delete this.resultFutures[commandId];
    }
    _postEvent({ name, data }) {
        let cbs = this.eventHandlers[name];
        if (cbs) {
            setTimeout(() => { cbs.forEach((fn) => { fn(data); }); }, 0);
        }
    }
}
const bridge = new WXBBridge();
window['wxbBridge'] = bridge;
export default bridge;
