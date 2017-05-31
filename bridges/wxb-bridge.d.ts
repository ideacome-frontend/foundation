export declare type ParamsType = {
    [key: string]: any;
};
export declare type CallbackType = (arg: any) => void;
export declare class ResultFuture {
    private successCallback;
    private failureCallback;
    success(cb: CallbackType): this;
    failure(cb: CallbackType): this;
    _invokeSuccess(data: any): void;
    _invokeFailure(reason: string): void;
}
export declare class WXBBridge {
    private resultFutures;
    private eventHandlers;
    private id;
    private hostInfo;
    private doSend;
    constructor();
    getHostInfo(): any;
    sendCommand(command: string, params?: ParamsType): ResultFuture;
    on(event: string, callback: CallbackType): void;
    off(event: string, callback?: CallbackType): void;
    _postResponse({commandId, response}: {
        commandId: string;
        response: any;
    }): void;
    _notifyFailure({commandId, reason}: {
        commandId: string;
        reason: string;
    }): void;
    _postEvent({name, data}: {
        name: string;
        data: any;
    }): void;
}
declare const bridge: WXBBridge;
declare global  {
    interface Window {
        wxbBridge: WXBBridge;
    }
}
export default bridge;
export {};
