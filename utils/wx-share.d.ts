export declare type CallbackType = (arg: any) => void;
/**
 * 微信分享设置
 * @param data
 */
export declare function wxShareHandle(data: {
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
    shareInfo: any;
}): void;
