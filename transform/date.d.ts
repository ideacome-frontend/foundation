/**
 * 把时间字符串或者时间戳转换为Date对象；
 * 时间戳的单位是毫秒；
 * 字符串的格式为 `yyyy-MM-dd` 或者 `yyyy-MM-dd HH:mm:ss`；
 * 否则，直接将字符串传入 `Date` 构造函数
 * @param sn 字符串或者时间戳
 */
export declare function dateFromStringOrNumber(sn: string | number): Date;
