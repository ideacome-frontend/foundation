
export type ParamsType = { [key: string]: any };
export type CallbackType = (arg: any) => void;

export class ResultFuture {
    private successCallback?: CallbackType;
    private failureCallback?: CallbackType;

    success(cb: CallbackType) {
        this.successCallback = cb;
        return this;
    }

    failure(cb: CallbackType) {
        this.failureCallback = cb;
        return this;
    }

    _invokeSuccess(data: any) {
        this.successCallback && this.successCallback(data);
    }

    _invokeFailure(reason: string) {
        this.failureCallback && this.failureCallback(reason);
    }
}

export class WXBBridge {

    private resultFutures: { [key: string]: ResultFuture } = {};
    private eventHandlers: { [key: string]: CallbackType[] } = {};
    private id = 0;
    private hostInfo = {};

    private doSend: (command: string, params: ParamsType, commandId: string) => void;

    constructor() {
        if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.wxbbridge) {
            this.doSend = (command, params, commandId) => {
                window['webkit'].messageHandlers.wxbbridge.postMessage({ command, params, commandId });
            };
            this.hostInfo = window['__wxb_host_info'];
        } else if (window['wxbbridgeandroid']) {
            this.doSend = (command, params, commandId) => {
                window['wxbbridgeandroid'].handleCommand(JSON.stringify({ command, params, commandId }));
            };
            try {
                this.hostInfo = JSON.parse(window['wxbbridgeandroid'].getHostInfo());
            } catch (e) {
            }
        } else {
            this.doSend = (command, params, commandId) => {
                this._notifyFailure({ commandId, reason: 'error not inside app' });
            };
        }
    }

    getHostInfo() {
        return JSON.parse(JSON.stringify(this.hostInfo));
    }

    sendCommand(command: string, params?: ParamsType): ResultFuture {
        let key = `${command}_${this.id++}`;
        let r = new ResultFuture();
        this.resultFutures[key] = r;
        this.doSend(command, params || {}, key);
        return r;
    }

    on(event: string, callback: CallbackType) {
        let cbs = this.eventHandlers[event] || [];
        cbs.push(callback);
        this.eventHandlers[event] = cbs;
    }

    off(event: string, callback?: CallbackType) {
        if (callback) {
            let cbs = this.eventHandlers[event] || [];
            let idx = cbs.indexOf(callback);
            if (idx >= 0) {
                cbs.splice(idx, 1);
            }
        } else {
            delete this.eventHandlers[event];
        }
    }

    _postResponse({ commandId, response }: { commandId: string, response: any }) {
        let r = this.resultFutures[commandId];
        setTimeout(() => { r && r._invokeSuccess(response); }, 0);
        delete this.resultFutures[commandId];
    }

    _notifyFailure({ commandId, reason }: { commandId: string, reason: string }) {
        let r = this.resultFutures[commandId];
        setTimeout(() => { r && r._invokeFailure(reason); }, 0);
        delete this.resultFutures[commandId];
    }

    _postEvent({ name, data }: { name: string, data: any }) {
        let cbs = this.eventHandlers[name];
        if (cbs) {
            setTimeout(() => { cbs.forEach((fn) => { fn(data); }); }, 0);
        }
    }

}

const bridge = new WXBBridge();

window['wxbBridge'] = bridge;

declare global {
    interface Window {
        wxbBridge: WXBBridge;
    }
}

export default bridge;
