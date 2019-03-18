/**
 * [wxbFromString 针对IOS进行的时间字符串转换函数]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export declare function wxbFromString(str: string): Date | undefined;
/**
 * 日期对象的格式化;
 * date Date Object or timeStamp
 * eg1: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * eg2: formatDate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss')
 */
export declare function formatDate(date: Date | number, fmt: string): string;
export declare function formatTime(addTime: {
    [key: string]: any;
}): string;
/**
 * 格式化手机号
 * @param telNo 手机号
 */
export declare function formatTelNum(telNo: string | number): string;
export declare function formatMoney(money: string | number, n: number): string;
/**
 * 银行卡号分割
 * @param str
 **/
export declare function formatBankNo(str: string): string;
/**
 * 去空格
 * @param str
 **/
export declare function trimAll(str: string): string;
/***
 * 字符串转驼峰
 * @param string 如demo-demo
 * @returns {string|void|XML|*} demoDemo
 */
export declare function stringToCamelCase(string: string): string;
/***
 * 驼峰转字符串
 * @param string 如demoDemo
 * @returns {string|void|XML|*} demo-demo
 */
export declare function camelCaseToString(string: string): string;
/**
 * 反解析，将JSON转成String
 * @param qObj
 * @return {string}
 */
export declare function parseJsonToString(qObj: object): string;
/**
 * [moneyCuter 将数字类型转化为每3个数字一个逗号的货币格式]
 * @param  {[string]}   [待转换的浮点数字串]
 * @return {[string]}   [转换后的标准货币格式字符串]
 */
export declare function moneyCuter(s: string): string;
export declare function cutNumberByDigits(num: number | string, digits?: number): string;
