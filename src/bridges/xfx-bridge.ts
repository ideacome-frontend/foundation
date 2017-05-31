
declare global {
    interface Window {
        xfxForAndroid?: any;
        wxbAlert?: any;
        xfxBridgeConf?: any;
    }
}
declare var wxbAlert: any;

var initialized = false;
var platform = undefined;
var handler;
var hostSystemInfo = undefined;

var commandBuffer = {};

function iOSHandler(o) {
    commandBuffer[o.command] = o;
    location.href = "xfx://sendCommand/" + o.command;
}

function androidHandler(o) {
    if (window["xfxForAndroid"] && window.xfxForAndroid["sendCommand"]) {
        commandBuffer[o.command] = o;
        window.xfxForAndroid.sendCommand(JSON.stringify({ command: o.command, params: o.params || {} }));
    }
    else if (o.fallback) {
        o.fallback(o.params);
    }
}

function fetchParams(c) {
    var o = commandBuffer[c];
    var params;
    if (o) params = o.params;
    return JSON.stringify(params || {});
}

var eventBuffer = {};

function onEvent(name, callback) {
    eventBuffer[name] = callback;
}

function sendEvent(o) {
    var f = eventBuffer[o.name];
    setTimeout(function () {
        f && f(o.data);
    }, 0);
}

function init(p, sys) {
    platform = p;
    initialized = true;//如果未传入配置，则按照默认处理
    var handlers = {
        iOS: iOSHandler,
        Android: androidHandler
    };
    handler = handlers[p];
    (xfxBridge as any).respond = respond;
    (xfxBridge as any).sendEvent = sendEvent;
    (xfxBridge as any).fetchParams = fetchParams;
    if (typeof sys === 'object') {
        hostSystemInfo = Object.freeze ? Object.freeze(sys) : sys;
    }
}

function sendCommand(o) {
    if (initialized) {
        handler(o);
    }
    else if (o.fallback) {
        o.fallback(o.params);
    }
}

function respond(o) {
    var co = commandBuffer[o.command];
    setTimeout(function () {
        if (o.noImpl) {
            co.fallback && co.fallback(co.params);
        }
        else {
            co.callback && co.callback(o.response);
        }
    }, 0);
}

function getHostSystemInfo() {
    return hostSystemInfo || {};
}


var _paramstrq: any[] = [];
var _callback = {};
(window as any).xfxBridgeParam = function () {
    return _paramstrq.shift();
};
(window as any).xfxBridgeRespond = function (dict) {
    setTimeout(function () {
        var f = _callback[dict.key];
        f && f(dict.value);
    }, 0);
};
var _factory = {
    "iOS": function (cap, param1, param2) {
        switch (cap) {
            case "sendInvitation":
            case "openNewWebview":
                _paramstrq.push(JSON.stringify(param1));
                break;
            case "scanQRCode":
            case "uploadFile":
            case "uploadFileCropped":
                _callback[cap] = param1;
                break;
            case "notifyCarOwner":
                _paramstrq.push(JSON.stringify(param1));
                _callback[cap] = param2;
                break;
            case "getAppInfo":
                _callback[cap] = param1;
                break;
            case "pickContact":
            case "uploadImage":
                _paramstrq.push(JSON.stringify(param1));
                _callback[cap] = param2;
                break;
        }
        location.href = "xfx://" + cap;
    },
    "Android": function (cap, param1, param2) {
        if (!window["xfxForAndroid"]) {
            return _notAvailable();
        }
        switch (cap) {
            case "sendInvitation":
                window.xfxForAndroid.sendInvitation(JSON.stringify(param1));
                break;
            case "scanQRCode":
                _callback[cap] = param1;
                window.xfxForAndroid.scanQRCode();
                break;
            case "uploadFile":
                _callback[cap] = param1;
                window.xfxForAndroid.uploadFile();
                break;
            case "uploadFileCropped":
                _callback[cap] = param1;
                window.xfxForAndroid.uploadFileCropped();
                break;
            case "openNewWebview":
                window.xfxForAndroid.openNewWebview(JSON.stringify(param1));
                break;
            case "reset":
                window.xfxForAndroid.reset();
                break;
            case "notifyCarOwner":
                _callback[cap] = param2;
                window.xfxForAndroid.notifyCarOwner(JSON.stringify(param1));
                break;
            case "getAppInfo":
                _callback[cap] = param1;
                window.xfxForAndroid.getAppInfo();
                break;
            case "notifyLogout":
                window.xfxForAndroid.notifyLogout();
                break;
            case "setReturnFlag":
                window.xfxForAndroid.setReturnFlag(param1);
                break;
            case "pickContact":
                _callback[cap] = param2;
                window.xfxForAndroid.pickContact(JSON.stringify(param1));
                break;
            case "uploadImage":
                _callback[cap] = param2;
                window.xfxForAndroid.uploadImage(JSON.stringify(param1));
                break;
        }
    }
};
function _notAvailable() {
    if (window.wxbAlert) {
        wxbAlert("您的App版本不支持此功能");
    } else {
        alert("您的App版本不支持此功能");
    }
}
function _methodFor(cap, fallback?): (...args: any[]) => void {
    function _route() {
        if (!_supports(cap)) {
            if (fallback) {
                return fallback.apply(null, arguments);
            }
            return _notAvailable();
        }
        var m = _factory[_getPlatform()];
        var arr = [cap];
        for (var i = 0; i < arguments.length; ++i) arr.push(arguments[i]);
        m.apply(null, arr);
    }
    return _route;
}
function _getPlatform() {
    var conf = window["xfxBridgeConf"];
    if (conf) {
        return conf.platform;
    }
}
function _supports(cap) {
    return window["xfxBridgeConf"] && window.xfxBridgeConf.capabilities.indexOf(cap) != -1;
}

var _methodForOpenNewWebview = _methodFor("openNewWebview", function (o) {
    window.location.href = o.url;
})
function _openNewWebview(o) {
    if (!(o.url.match(/[_\.!~*'()-]/) && o.url.match(/%[0-9a-f]{2}/i))) {
        o.url = encodeURI(o.url);
    }
    _methodForOpenNewWebview(o);
}
var _methodForUploadFile = _methodFor("uploadFile");
var _methodForUploadFileCropped = _methodFor("uploadFileCropped");
function _uploadFile(arg0, arg1) {
    if (typeof arg0 !== 'function' && typeof arg1 === 'function') {
        if (arg0 && _supports('uploadFileCropped')) {
            _methodForUploadFileCropped(arg1);
        }
        else {
            _methodForUploadFile(arg1);
        }
    }
    else {
        _methodForUploadFile(arg0);
    }
}
const xfxBridge = {
    initialized: initialized,
    init: init,
    sendCommand: sendCommand,
    onEvent: onEvent,
    getHostSystemInfo: getHostSystemInfo,

    sendInvitation: _methodFor("sendInvitation"),
    scanQRCode: _methodFor("scanQRCode"),
    uploadFile: _uploadFile,
    openNewWebview: _openNewWebview,
    reset: _methodFor("reset", function (url) { url && (window.location.href = url); }),
    notifyCarOwner: _methodFor("notifyCarOwner", function (o, f) { f && f(); }),
    getAppInfo: _methodFor("getAppInfo", function (f) { var o = { platform: _getPlatform() || "Unknown" }; f && f(JSON.stringify(o)); }),
    notifyLogout: _methodFor("notifyLogout", function () { }),
    setReturnFlag: _methodFor("setReturnFlag", function () { }),
    pickContact: _methodFor("pickContact"),
    uploadImage: _methodFor("uploadImage"),

    supports: _supports,
    getPlatform: _getPlatform
};

window['xfxBridge'] = xfxBridge;

export default xfxBridge;
