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
