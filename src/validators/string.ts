
/**
 * 验证字符串是否只包含中文字符
 * @param s 目标字符串
 */
export function isAllChinese(s: string): boolean {
    let r = /^[\u4E00-\u9FA5]+$/i;
    // 此处匹配时不将s中的空格去掉
    return r.test(s);
}

/**
 * 验证字符串是否含有中文字符
 * @param s 目标字符串
 */
export function hasChinese(s: string): boolean {
    let r = /[\u4E00-\u9FA5]/;
    return r.test(s);
}
