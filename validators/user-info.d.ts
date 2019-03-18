/**
 * 验证身份证号码
 * @param idNumber 身份证号码
 */
export declare function isValidID(idNumber?: string): boolean;
/**
 * 验证统一社会信用代码
 * @param {string} value 信用代码
 */
export declare function isValidSocialCreditCode(value: string): boolean;
/**
 * 验证组织机构代码
 * @param {string} value 机构代码
 */
export declare function isValidOrgCodeValid(value: string): boolean;
/**
 * 验证邮箱
 * @param email 邮箱
 */
export declare function isValidEmail(email: string): boolean;
/**
 * 验证手机号
 * @param phone 手机号
 */
export declare function isValidCellphone(phone: string): boolean;
/**
 * 验证银行卡号
 * @param cardNumber 银行卡号
 */
export declare function isValidBankCardNumber(cardNumber: string): boolean;
/**
 * 验证密码
 * 规则：8-16位数字和字母组成的字符串
 * */
export declare function isValidPassword(password: string): boolean;
