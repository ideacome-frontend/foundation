import { trimAll } from "../transform/string";
/**
 * 验证字符串是否只包含中文字符
 * @param s 目标字符串
 */
export function isAllChinese(s) {
    var r = /^[\u4E00-\u9FA5]+$/i;
    return r.test(trimAll(s));
}
/**
 * 验证字符串是否含有中文字符
 * @param s 目标字符串
 */
export function hasChinese(s) {
    var r = /[\u4E00-\u9FA5]/;
    return r.test(s);
}
