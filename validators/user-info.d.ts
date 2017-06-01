/**
 * 验证身份证号码
 * @param idNumber 身份证号码
 */
export declare function isValidID(idNumber: string): boolean;
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
export { isAllChinese, hasChinese } from './string';
