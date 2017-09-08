/**
 * 判断url是否需要编码处理，如果需要，返回 `encodeURI` 的结果；否则原样返回。
 * @param url
 */
export function encodeUrlIfNeeded(url) {
    if (!(url.match(/[_\.!~*'()-]/) && url.match(/%[0-9a-f]{2}/i))) {
        return encodeURI(url);
    }
    return url;
}
/**
 * 解析url，获取相应的参数。
 * @param url
 */
export function parseUrlQuery(url) {
    if (url === void 0) { url = location.href; }
    var query = {}, i, params, param, length;
    if (typeof url === 'string' && url.length) {
        url = url.indexOf('?') > -1 ? url.replace(/\S*\?/, '') : '';
        params = url.split('&'), length = params.length;
        for (i = 0; i < length; i++) {
            param = params[i].replace(/#\S+/g, '').split('=');
            query[decodeURIComponent(param[0])] = decodeURIComponent(param[1]) || '';
        }
    }
    return query;
}
