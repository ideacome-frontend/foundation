import { dateFromStringOrNumber } from "./date";

/**
 * 在字符串开始处填充字符，使得总长度不少于指定长度
 * @param sn 数字或者字符串
 * @param length 最小长度
 * @param ch 用于填充的字符
 */
export function pad(sn: string | number, length: number, ch: string = '0'): string {
    let ret = '' + sn;
    while (ret.length < length) {
        ret = ch + ret;
    }
    return ret;
}

/**
 * 格式化日期成指定格式字符串；
 * 完整支持的格式为 `yyyy-MM-dd HH:mm:ss.S`；
 * 当然可以只使用部分格式；
 * 为了代码兼容，允许使用 `hh` 代替 `HH`
 * @param d 可以是Date对象、时间戳、字符串
 * @param fmt 格式字符串
 */
export function formatDate(d: Date | number | string, fmt: string): string {
    let date: Date;
    if (typeof d === 'number' || typeof d === 'string') {
        date = dateFromStringOrNumber(d);
    } else {
        date = d;
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "S": pad(date.getMilliseconds(), 3)
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, pad(o[k], RegExp.$1.length));
        }
    }
    return fmt;
}

/**
 * 格式化时间戳；
 * 如果是今天，则返回 `hh:mm` 格式的时间；
 * 如果是昨天，则返回 `昨天`；
 * 否则，返回 `MM/dd` 格式的日期
 * @param timestamp 时间戳
 */
export function friendlyFormatTime(timestamp: number): string {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let startOftoday = date.getTime()
    let startOfyesterday = startOftoday - 24 * 3600 * 1000;
    if (timestamp > startOfyesterday) {
        if (timestamp < startOftoday) {
            return '昨天';
        } else {
            return formatDate(timestamp, 'hh:mm');
        }
    } else {
        return formatDate(timestamp, 'MM/dd');
    }
}
