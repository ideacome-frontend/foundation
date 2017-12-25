var XFXBridge = (function () {
    function XFXBridge() {
        var _this = this;
        this.initialized = false;
        this.hostSystemInfo = {};
        this.commandRegistry = {};
        this.eventHandler = {};
        this.commandHandler = function (co) {
            _this.respond({
                command: co.command,
                noImpl: true,
            });
        };
    }
    XFXBridge.prototype.init = function (platform, hostSystemInfo) {
        this.platform = platform;
        if (typeof hostSystemInfo === 'object') {
            this.hostSystemInfo = Object.freeze ? Object.freeze(hostSystemInfo) : hostSystemInfo;
        }
        if (platform === 'iOS') {
            this.commandHandler = function (co) {
                location.href = "xfx://sendCommand/" + co.command;
            };
        }
        else if (platform === 'Android') {
            this.commandHandler = function (co) {
                window['xfxForAndroid'].sendCommand(JSON.stringify({ command: co.command, params: co.params || {} }));
            };
        }
        this.initialized = true;
    };
    XFXBridge.prototype.respond = function (o) {
        var co = this.commandRegistry[o.command];
        setTimeout(function () {
            if (o.noImpl) {
                co.fallback && co.fallback(co.params);
            }
            else {
                co.callback && co.callback(o.response);
            }
        }, 0);
    };
    XFXBridge.prototype.sendEvent = function (o) {
        var cb = this.eventHandler[o.name];
        setTimeout(function () {
            cb && cb(o.data);
        }, 0);
    };
    XFXBridge.prototype.fetchParams = function (command) {
        var co = this.commandRegistry[command];
        var params = co && co.params;
        return JSON.stringify(params || {});
    };
    XFXBridge.prototype.sendCommand = function (co) {
        this.commandRegistry[co.command] = co;
        this.commandHandler(co);
    };
    XFXBridge.prototype.openNewWebview = function (o) {
        if (!(o.url.match(/[_\.!~*'()-]/) && o.url.match(/%[0-9a-f]{2}/i))) {
            o.url = encodeURI(o.url);
        }
        this.sendCommand({
            command: 'openNewWebview',
            params: {
                url: o.url,
                usesWebNavbar: o.usesWebNavbar
            },
            fallback: o.fallback || function () { location.href = o.url; }
        });
    };
    XFXBridge.prototype.getHostSystemInfo = function () {
        return this.hostSystemInfo;
    };
    XFXBridge.prototype.getPlatform = function () {
        return this.platform;
    };
    XFXBridge.prototype.onEvent = function (name, callback) {
        this.eventHandler[name] = callback;
    };
    return XFXBridge;
}());
export { XFXBridge };
var bridge = new XFXBridge();
window['xfxBridge'] = bridge;
export default bridge;
