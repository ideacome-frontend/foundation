
/**
 * 判断url是否需要编码处理，如果需要，返回 `encodeURI` 的结果；否则原样返回。
 * @param url 
 */
export function encodeUrlIfNeeded(url: string): string {
    if (!(url.match(/[_\.!~*'()-]/) && url.match(/%[0-9a-f]{2}/i))) {
        return encodeURI(url);
    }
    return url;
}
