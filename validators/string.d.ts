/**
 * 验证字符串是否只包含中文字符
 * @param s 目标字符串
 */
export declare function isAllChinese(s: string): boolean;
/**
 * 验证字符串是否含有中文字符
 * @param s 目标字符串
 */
export declare function hasChinese(s: string): boolean;
/**
 * 验证日期
 * @param date {string} 2001-01-01
 * @returns {boolean}
 */
export declare function isDate(date: string): boolean;
/***
 * 字符串是否为空
 * @param str
 * @returns {boolean}
 */
export declare function notEmptyString(str: string): boolean;
export declare function notEmpty(arg: any): boolean;
/***
 * 字符串最小长度
 * @param str
 * @returns {boolean}
 */
export declare function minLength(str: string, minLen?: number): boolean;
/***
 * 只包含数字或字母
 * @param str
 * @returns {boolean}
 */
export declare function isNumOrLetter(str: string): boolean;
/**
 * 允许包含汉字、字母
 * @param str
 * @returns {boolean}
 */
export declare function personalName(str: string): boolean;
/**
 * 允许包含汉字、英文、数字、标点符号
 * @param str
 * @returns {boolean}
 */
export declare function isMultName(str: string): boolean;
/**
 * 判断文本中是否有emoji表情
 * substring [String]
 * **/
export declare function isEmojiCharacter(substring: string): boolean;
