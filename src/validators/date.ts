/**
 * 校验日期是否晚于当前时间
 * @param date：需要被校验的日期 时间戳或者'2016-2-2 12:12:12'格式
 * @return [Boolean] true: 不晚于当前时间  false： 晚于或等于当前时间
 * */
export function dateEarlierThanNow(date: number | string): boolean {
    let dateTimestamp = new Date(date).getTime();
    let nowDate = new Date().getTime();
    if (nowDate <= dateTimestamp) {
        return false;
    }
    return true;
}

/**
 * 获取今天的xxxx-xx-xx日期
 * @returns {string}
 */
export function getToday(): string {
    let datetime = new Date();
    let year = datetime.getFullYear();//获取完整的年份(4位,1970)
    let month: number = datetime.getMonth() + 1;//获取月份(0-11,0代表1月,用的时候记得加上1)
    if (month <= 9) {
        month = 0 + month;
    }
    let date = datetime.getDate();//获取日(1-31)
    if (date <= 9) {
        date = 0 + date;
    }
    return `${year}-${month}-${date} 00:00:00`;
}

/**
 * 校验日期是否晚于今天
 * @param date 需要被校验的日期 时间戳或者'2016-2-2 12:12:12'格式， 如果为2016-2-2格式，new Date(date)会将时分秒默认改成08:00:00
 * @return {boolean} true: 不晚于（早于等于）今天  false： 晚于今天
 */
export function dateEarlierThanToday(date: number | string) {
    let dateTimestamp = new Date(date).setHours(0);
    const today = getToday();
    let todayTimestamp = new Date(today).getTime();
    if (todayTimestamp < dateTimestamp) {
        return false;
    }
    return true;
}