export { default as Timer } from './timer';
export * from './geolocation';
export * from './wx-share';
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
/**
 * 加载**.js文件
 * scriptSrc 文件路径
 * successCallback 加载成功回调函数
 * script 标签id
 * content js标签内的内容
 */
export function loadJs(scriptSrc, successCallback, id, content) {
    //gets document head element
    var head = document.querySelector('head');
    if (head) {
        //creates a new script tag
        var script = document.createElement('script');
        //adds src and type to script tag
        script.type = 'text/javascript';
        script.src = scriptSrc;
        if (id)
            script.id = id;
        if (content)
            script.textContent = content;
        //calling a function after the js is loaded (Firefox)
        if (successCallback)
            script.onload = successCallback;
        //append the script tag to document head element
        head.appendChild(script);
    }
}
/**
 * 是否已经加载过**.js文件
 * name js文件名
 */
export function isIncludeJs(name) {
    var scripts = document.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i]['src'].indexOf(name) > -1) {
            return true; //已加载
        }
    }
    return false;
}
