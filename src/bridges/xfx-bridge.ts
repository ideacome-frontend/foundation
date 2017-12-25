
export interface XFXCommand {
    command: string;
    params?: { [key: string]: any };
    fallback?: (params?: { [key: string]: any }) => void;
    callback?: (response: any) => void;
}

interface XFXResponsePayload {
    command: string;
    noImpl?: boolean;
    response?: any;
}

interface XFXEventPayload {
    name: string;
    data?: any;
}

export type XFXEventCallback = (data?: any) => void;

export interface XFXHostSystemInfo {
    platform?: string;
    appVersion?: string;
    OSVersion?: string;
    /**
     * 硬件型号, e.g. iPhone X
     */
    model?: string;
    /**
     * App打包渠道, e.g. 'app store'
     */
    channel?: string;
}

export class XFXBridge {
    private initialized = false;
    private platform: string;
    private hostSystemInfo: XFXHostSystemInfo = {};

    private commandRegistry: {[command: string]: XFXCommand} = {};
    private eventHandler: {[event: string]: XFXEventCallback} = {};
    private commandHandler: (co: XFXCommand) => void;

    constructor() {
        this.commandHandler = (co) => {
            this.respond({
                command: co.command,
                noImpl: true,
            });
        };
    }

    private init(platform: string, hostSystemInfo?: object) {
        this.platform = platform;
        if (typeof hostSystemInfo === 'object') {
            this.hostSystemInfo = Object.freeze ? Object.freeze(hostSystemInfo) : hostSystemInfo;
        }
        if (platform === 'iOS') {
            this.commandHandler = (co) => {
                this.commandRegistry[co.command] = co;
                location.href = `xfx://sendCommand/${co.command}`;
            };
        } else if (platform === 'Android') {
            this.commandHandler = (co) => {
                this.commandRegistry[co.command] = co;
                window['xfxForAndroid'].sendCommand(JSON.stringify({ command: co.command, params: co.params || {} }));
            };
        }
        this.initialized = true;
    }

    private respond(o: XFXResponsePayload) {
        const co = this.commandRegistry[o.command];
        setTimeout(() => {
            if (o.noImpl) {
                co.fallback && co.fallback(co.params);
            } else {
                co.callback && co.callback(o.response);
            }
        }, 0);
    }

    private sendEvent(o: XFXEventPayload) {
        const cb = this.eventHandler[o.name];
        setTimeout(() => {
            cb && cb(o.data);
        }, 0);
    }

    private fetchParams(command: string) {
        const co = this.commandRegistry[command];
        const params = co && co.params;
        return JSON.stringify(params || {});
    }

    sendCommand(co: XFXCommand) {
        this.commandHandler(co);
    }

    openNewWebview(o: {
        url: string;
        usesWebNavbar?: boolean;
        fallback?: () => void;
    }) {
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
    }

    getHostSystemInfo() {
        return this.hostSystemInfo;
    }

    getPlatform() {
        return this.platform;
    }

    onEvent(name: string, callback: XFXEventCallback) {
        this.eventHandler[name] = callback;
    }
}

const bridge = new XFXBridge();

window['xfxBridge'] = bridge;

declare global {
    interface Window {
        xfxBridge: XFXBridge;
    }
}

export default bridge;
