/**
 * 格式化日期成指定格式字符串；
 * 完整支持的格式为 `yyyy-MM-dd HH:mm:ss.S`；
 * 当然可以只使用部分格式；
 * 为了代码兼容，允许使用 `hh` 代替 `HH`
 * @param d 可以是Date对象、时间戳、字符串
 * @param fmt 格式字符串
 */
export declare function formatDate(d: Date | number | string, fmt: string): string;
/**
 * 格式化时间戳；
 * 如果是今天，则返回 `hh:mm` 格式的时间；
 * 如果是昨天，则返回 `昨天`；
 * 否则，返回 `MM/dd` 格式的日期
 * @param timestamp 时间戳
 */
export declare function friendlyFormatTime(timestamp: number): string;
/**
 * 格式化银行卡号，每4位数字之间加一个空格。
 * @param cardNumber 银行卡号
 */
export declare function formatBankCardNumber(cardNumber: string): string;
/**
 * 格式化手机号为 `### #### ####`
 * @param phone 手机号
 */
export declare function formatPhoneNumber(phone: string): string;
/**
 * 用大写中文字表示浮点数金额
 * @param n 浮点数表示的金额
 */
export declare function formatMoneyUppercasedChinese(n: number): string;
