export { default as Timer } from './timer';
export * from './geolocation';
export * from './wx-share';
/**
 * 生成一个数字序列，包含从 `start` 递增到 `end` 的数字
 * @param start 数字开始
 * @param end 数字结束（包含）
 * @returns 数字数组
 */
export declare function numbersInRange(start: number, end: number): number[];
/**
 * 返回 `year` 年 `month` 月 全月天数
 * @param month 月份
 * @param year 年份
 */
export declare function daysInMonth(month: number, year: number): number;
export declare type LoadJsCallback = (...args: any[]) => void;
/**
 * 加载**.js文件
 * scriptSrc 文件路径
 * successCallback 加载成功回调函数
 * script 标签id
 * content js标签内的内容
 */
export declare function loadJs(scriptSrc: string, successCallback?: LoadJsCallback, id?: string, content?: string): void;
/**
 * 是否已经加载过**.js文件
 * name js文件名
 */
export declare function isIncludeJs(name: any): boolean;
