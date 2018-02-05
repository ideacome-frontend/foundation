export interface XFXCommand {
    command: string;
    params?: {
        [key: string]: any;
    };
    fallback?: (params?: {
        [key: string]: any;
    }) => void;
    callback?: (response: any) => void;
}
export declare type XFXEventCallback = (data?: any) => void;
export interface XFXHostSystemInfo {
    platform?: string;
    appVersion?: string;
    OSVersion?: string;
    /**
     * 硬件型号, e.g. iPhone X
     */
    model?: string;
    /**
     * 品牌
     */
    brand?: string;
    screenWidth?: number;
    screenHeight?: number;
    /**
     * App打包渠道, e.g. 'app store'
     */
    channel?: string;
}
export declare class XFXBridge {
    private initialized;
    private platform;
    private hostSystemInfo;
    private commandRegistry;
    private eventHandler;
    private commandHandler;
    constructor();
    private initIOS();
    private initAndroid();
    private init(platform, hostSystemInfo?);
    private respond(o);
    private sendEvent(o);
    private fetchParams(command);
    sendCommand(co: XFXCommand): void;
    openNewWebview(o: {
        url: string;
        usesWebNavbar?: boolean;
        fallback?: () => void;
    }): void;
    getHostSystemInfo(): XFXHostSystemInfo;
    getPlatform(): string;
    onEvent(name: string, callback: XFXEventCallback): void;
}
declare const bridge: XFXBridge;
declare global  {
    interface Window {
        xfxBridge: XFXBridge;
    }
}
export default bridge;
export {};
