interface wxBaseInfo {
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
    shareInfo: any;
}
/**
 * 微信分享设置
 * @param data
 */
export declare function wxShareHandle(data: wxBaseInfo): void;
/**
 * 添加页面关闭和 禁用分享功能
 * @param {Object} data 请求签名接口返回的数据
 * @param {String} type 微信sdk中功能
 */
export declare function wxConfigHandle(data: wxBaseInfo, type: string, menuList?: string[]): void;
interface WxpayParams {
    signType: string;
    paySign: string;
    timeStamp: string;
    packageInfo: string;
    appId: string;
    flowId: string;
    nonceStr: string;
}
export declare function wxPayHanlde(data: WxpayParams, { success, cancel, fail }: {
    success: any;
    cancel: any;
    fail: any;
}): void;
export {};
