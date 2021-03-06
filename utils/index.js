export { default as Timer } from './timer';
export * from './geolocation';
export * from './wx-share';
export * from './external';
/**
 * 生成一个数字序列，包含从 `start` 递增到 `end` 的数字
 * @param start 数字开始
 * @param end 数字结束（包含）
 * @returns 数字数组
 */
export function numbersInRange(start, end) {
    var arr = [];
    for (var i = start; i <= end; ++i) {
        arr.push(i);
    }
    return arr;
}
/**
 * 返回 `year` 年 `month` 月 全月天数
 * @param month 月份
 * @param year 年份
 */
export function daysInMonth(month, year) {
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0) {
        return 31;
    }
    else if (month !== 2) {
        return 30;
    }
    else {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 29;
        }
        else {
            return 28;
        }
    }
}
