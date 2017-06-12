import { dateFromStringOrNumber } from "./date";
import { pad, trimAll } from "./string";
/**
 * 格式化日期成指定格式字符串；
 * 完整支持的格式为 `yyyy-MM-dd HH:mm:ss.S`；
 * 当然可以只使用部分格式；
 * 为了代码兼容，允许使用 `hh` 代替 `HH`
 * @param d 可以是Date对象、时间戳、字符串
 * @param fmt 格式字符串
 */
export function formatDate(d, fmt) {
    var date;
    if (typeof d === 'number' || typeof d === 'string') {
        date = dateFromStringOrNumber(d);
    }
    else {
        date = d;
    }
    var o = {
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
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
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
export function friendlyFormatTime(timestamp) {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var startOftoday = date.getTime();
    var startOfyesterday = startOftoday - 24 * 3600 * 1000;
    if (timestamp > startOfyesterday) {
        if (timestamp < startOftoday) {
            return '昨天';
        }
        else {
            return formatDate(timestamp, 'hh:mm');
        }
    }
    else {
        return formatDate(timestamp, 'MM/dd');
    }
}
/**
 * 格式化银行卡号，每4位数字之间加一个空格。
 * @param cardNumber 银行卡号
 */
export function formatBankCardNumber(cardNumber) {
    var n = trimAll(cardNumber);
    n = n.replace(/(\d{4})(?=\d)/g, "$1 ");
    return n;
}
/**
 * 格式化手机号为 `### #### ####`
 * @param phone 手机号
 */
export function formatPhoneNumber(phone) {
    var n = trimAll(phone);
    var parts = [n.slice(0, 3), n.slice(3, 7), n.slice(7)]
        .filter(function (p) { return !!p; });
    return parts.join(' ');
}
/**
 * 用大写中文字表示浮点数金额
 * @param n 浮点数表示的金额
 */
export function formatMoneyUppercasedChinese(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
