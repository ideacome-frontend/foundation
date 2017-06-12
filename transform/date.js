/**
 * 把时间字符串或者时间戳转换为Date对象；
 * 时间戳的单位是毫秒；
 * 字符串的格式为 `yyyy-MM-dd` 或者 `yyyy-MM-dd HH:mm:ss`；
 * 否则，直接将字符串传入 `Date` 构造函数
 * @param sn 字符串或者时间戳
 */
export function dateFromStringOrNumber(sn) {
    var dpart;
    var tpart;
    if (typeof sn === 'number') {
        return new Date(sn);
    }
    else if (/^\d+-\d{2}-\d{2}$/.test(sn)) {
        dpart = sn.split('-');
        return new Date(+dpart[0], +dpart[1] - 1, +dpart[2]);
    }
    else if (/^\d+-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(sn)) {
        dpart = sn.split(' ')[0].split('-');
        tpart = sn.split(' ')[1].split(':');
        return new Date(+dpart[0], +dpart[1] - 1, +dpart[2], +tpart[0], +tpart[1], +tpart[2]);
    }
    else {
        return new Date(sn);
    }
}
