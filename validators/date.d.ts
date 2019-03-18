/**
 * 校验日期是否晚于当前时间
 * @param date：需要被校验的日期 时间戳或者'2016-2-2 12:12:12'格式
 * @return [Boolean] true: 不晚于当前时间  false： 晚于或等于当前时间
 * */
export declare function dateEarlierThanNow(date: number | string): boolean;
/**
 * 获取今天的xxxx-xx-xx日期
 * @returns {string}
 */
export declare function getToday(): string;
/**
 * 校验日期是否晚于今天
 * @param date 需要被校验的日期 时间戳或者'2016-2-2 12:12:12'格式， 如果为2016-2-2格式，new Date(date)会将时分秒默认改成08:00:00
 * @return {boolean} true: 不晚于（早于等于）今天  false： 晚于今天
 */
export declare function dateEarlierThanToday(date: number | string): boolean;
