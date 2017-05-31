declare global  {
    interface Window {
        xfxForAndroid?: any;
        wxbAlert?: any;
        xfxBridgeConf?: any;
    }
}
declare const xfxBridge: {
    initialized: boolean;
    init: (p: any, sys: any) => void;
    sendCommand: (o: any) => void;
    onEvent: (name: any, callback: any) => void;
    getHostSystemInfo: () => {};
    sendInvitation: (...args: any[]) => void;
    scanQRCode: (...args: any[]) => void;
    uploadFile: (arg0: any, arg1: any) => void;
    openNewWebview: (o: any) => void;
    reset: (...args: any[]) => void;
    notifyCarOwner: (...args: any[]) => void;
    getAppInfo: (...args: any[]) => void;
    notifyLogout: (...args: any[]) => void;
    setReturnFlag: (...args: any[]) => void;
    pickContact: (...args: any[]) => void;
    uploadImage: (...args: any[]) => void;
    supports: (cap: any) => boolean;
    getPlatform: () => any;
};
export default xfxBridge;
export {};
