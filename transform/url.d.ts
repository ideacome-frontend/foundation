/**
 * 判断url是否需要编码处理，如果需要，返回 `encodeURI` 的结果；否则原样返回。
 * @param url
 */
export declare function encodeUrlIfNeeded(url: string): string;
/**
 * 解析url，获取相应的参数。
 * @param url
 */
export declare function parseUrlQuery(url?: string): any;
/**
 * 解析json，获得get请求需要的参数字符串。eg: {token: 'FeiXia', name: 'aa'}转成'token=FeiXia&name=aa'的形式
 * @param dataJson
 */
export declare function parseJsonToString(dataJson?: {}): string;
