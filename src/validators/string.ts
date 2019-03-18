
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

/**
 * 验证日期
 * @param date {string} 2001-01-01
 * @returns {boolean}
 */
export function isDate(date: string): boolean {
    let reg = date.match(/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/);
    if (reg == null) return false;
    const d = new Date(Number(reg[1]), Number(reg[3]) - 1, Number(reg[4]));
    return (d.getFullYear() == Number(reg[1]) && (d.getMonth() + 1) == Number(reg[3]) && d.getDate() == Number(reg[4]));
}

/***
 * 字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function notEmptyString(str: string): boolean {
    return !!str
}

/* 判断传入参数是否为空，及是否为 空字符串 或 undefined 或 null
*  @param arg 传入参数
*  @return {boolean}
* */
export function notEmpty(arg: any): boolean {
    return arg === 0 || !!arg;
}

/***
 * 字符串最小长度
 * @param str
 * @returns {boolean}
 */
export function minLength(str: string, minLen: number = 2): boolean {
    return str.length >= minLen;
}

/***
 * 只包含数字或字母
 * @param str
 * @returns {boolean}
 */
export function isNumOrLetter(str: string): boolean {
    const Regx = /^[A-Za-z0-9]*$/;
    return Regx.test(str);
}

/**
 * 允许包含汉字、字母
 * @param str
 * @returns {boolean}
 */
export function personalName(str: string): boolean {
    const Regx = /^[a-zA-Z·\u4e00-\u9fa5]*$/;
    return Regx.test(str);
}

/**
 * 允许包含汉字、英文、数字、标点符号
 * @param str
 * @returns {boolean}
 */
export function isMultName(str: string): boolean {
    const Regx = /^[a-zA-Z0-9·\u4e00-\u9fa5\u0020-\u007e\uFF00-\uFF65\uFFE0-\uFFEE\u3000-\u303F]*$/;
    return Regx.test(str);
}

/**
 * 判断文本中是否有emoji表情
 * substring [String]
 * **/
export function isEmojiCharacter(substring: string): boolean {
    for (let i = 0; i < substring.length; i++) {
        let hs = substring.charCodeAt(i);
        let ls: any;
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                ls = substring.charCodeAt(i + 1);
                let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
            }
        }
    }
    return false;
}