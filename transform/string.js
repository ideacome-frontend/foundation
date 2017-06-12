/**
 * 移除字符串中的空白字符。
 * @param s 目标字符串
 */
export function trimAll(s) {
    if (!s) {
        return s;
    }
    return s.replace(/\s+/g, '');
}
/**
 * 在字符串开始处填充字符，使得总长度不少于指定长度
 * @param sn 数字或者字符串
 * @param length 最小长度
 * @param ch 用于填充的字符
 */
export function pad(sn, length, ch) {
    if (ch === void 0) { ch = '0'; }
    var ret = '' + sn;
    while (ret.length < length) {
        ret = ch + ret;
    }
    return ret;
}
