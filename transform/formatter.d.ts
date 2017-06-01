/**
 * 在字符串开始处填充字符，使得总长度不少于指定长度
 * @param sn 数字或者字符串
 * @param length 最小长度
 * @param ch 用于填充的字符
 */
export declare function pad(sn: string | number, length: number, ch?: string): string;
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
