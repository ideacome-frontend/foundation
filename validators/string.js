/**
 * 验证字符串是否只包含中文字符
 * @param s 目标字符串
 */
export function isAllChinese(s) {
    var r = /^[\u4E00-\u9FA5]+$/i;
    // 此处匹配时不将s中的空格去掉
    return r.test(s);
}
/**
 * 验证字符串是否含有中文字符
 * @param s 目标字符串
 */
export function hasChinese(s) {
    var r = /[\u4E00-\u9FA5]/;
    return r.test(s);
}
/**
 * 验证日期
 * @param date {string} 2001-01-01
 * @returns {boolean}
 */
export function isDate(date) {
    var reg = date.match(/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/);
    if (reg == null)
        return false;
    var d = new Date(Number(reg[1]), Number(reg[3]) - 1, Number(reg[4]));
    return (d.getFullYear() == Number(reg[1]) && (d.getMonth() + 1) == Number(reg[3]) && d.getDate() == Number(reg[4]));
}
