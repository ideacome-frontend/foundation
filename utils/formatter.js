/**
 * [wxbFromString 针对IOS进行的时间字符串转换函数]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function wxbFromString(str) {
    var dpart, tpart;
    if (/^\d+-\d{2}-\d{2}$/.test(str)) {
        dpart = (str.split(' ')[0]).split('-');
        return new Date(+dpart[0], +(dpart[1]) - 1, +dpart[2]);
    }
    else if (/^\d+-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) {
        dpart = (str.split(' ')[0]).split('-');
        tpart = (str.split(' ')[1]).split(':');
        return new Date(+dpart[0], +(dpart[1]) - 1, +dpart[2], +tpart[0], +tpart[1], +tpart[2]);
    }
    else {
        if (typeof str === 'number') {
            return new Date(str);
        }
        else {
            console.log('invalid format');
        }
    }
}
/**
 * 日期对象的格式化;
 * date Date Object or timeStamp
 * eg1: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * eg2: formatDate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss')
 */
export function formatDate(date, fmt) {
    var obj = new Date();
    if (typeof date === 'number') {
        obj = new Date(date);
    }
    else if (typeof date === 'string') {
        date = Number(date);
        obj = new Date(date);
    }
    else if (typeof date === 'object') {
        obj = date;
    }
    var o = {
        "M+": obj.getMonth() + 1,
        "d+": obj.getDate(),
        "h+": obj.getHours(),
        "m+": obj.getMinutes(),
        "s+": obj.getSeconds(),
        "q+": Math.floor((obj.getMonth() + 3) / 3),
        "S": obj.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
/*格式化时间戳*/
export function formatTime(addTime) {
    var weekDay = '';
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    var yesterday = new Date(new Date().setDate(today.getDate() - 1));
    yesterday.setHours(0);
    yesterday.setMinutes(0);
    yesterday.setSeconds(0);
    if (addTime.time > yesterday.getTime()) {
        if (addTime.time < today.getTime()) {
            weekDay = '昨天';
        }
        else {
            weekDay = formatDate(new Date(addTime.time), 'hh:mm');
        }
    }
    else {
        weekDay = formatDate(new Date(addTime.time), 'MM/dd');
    }
    return weekDay;
}
/**
 * 格式化手机号
 * @param telNo 手机号
 */
export function formatTelNum(telNo) {
    var inputPhone = '';
    if (typeof telNo == 'number')
        telNo = telNo.toString();
    if (typeof telNo == 'string') {
        inputPhone = telNo.replace(/\s+/g, '');
        var len = inputPhone.length;
        if (len >= 4 && len < 8) {
            inputPhone = inputPhone.substr(0, 3) + " " + inputPhone.substr(3);
        }
        else if (len >= 8 && len < 12) {
            inputPhone = inputPhone.substr(0, 3) + " " + inputPhone.substr(3, 4) + " " + inputPhone.substr(7);
        }
    }
    else {
        inputPhone = telNo;
        console.log('手机号格式化参数类型不正确');
    }
    return inputPhone;
}
/*
 * 格式化金额 32,122.55
 * @param money, 需要被格式化的金额
 * @param n, 小数点位数
 */
export function formatMoney(money, n) {
    n = n > 0 && n <= 20 ? n : 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    //return r != 0 ? t.split("").reverse().join("") + "." + r : t.split("").reverse().join(""); //即使是0也保留小数
    return t.split("").reverse().join("") + "." + r;
}
/**
 * 银行卡号分割
 * @param str
 **/
export function formatBankNo(str) {
    if (!str) {
        return str;
    }
    //四个字符加一个空格
    str = str.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    //优化语句：如果当前位置是空格字符，则自动清除掉
    if (str.charAt(str.length - 1) == ' ') {
        str = str.substring(0, str.length - 1);
    }
    return str;
}
/**
 * 去空格
 * @param str
 **/
export function trimAll(str) {
    if (!str) {
        return str;
    }
    str = str.toString(); //确保字符串
    return str.replace(/\s+/g, '');
}
/***
 * 字符串转驼峰
 * @param string 如demo-demo
 * @returns {string|void|XML|*} demoDemo
 */
export function stringToCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
/***
 * 驼峰转字符串
 * @param string 如demoDemo
 * @returns {string|void|XML|*} demo-demo
 */
export function camelCaseToString(string) {
    return string.replace(/([A-Z])/g, "-$1").toLowerCase();
}
/**
 * 反解析，将JSON转成String
 * @param qObj
 * @param needEncode 是否需要对参数进行encode，默认false不需要
 * @return {string}
 */
export function parseJsonToString(qObj, needEncode) {
    var qArr = [];
    if (qObj) {
        for (var i in qObj) {
            var qVal = needEncode ? encodeURIComponent(qObj[i]) : qObj[i];
            qArr.push(i + '=' + qVal);
        }
    }
    return qArr.join('&');
}
/**
 * [moneyCuter 将数字类型转化为每3个数字一个逗号的货币格式]
 * @param  {[string]}   [待转换的浮点数字串]
 * @return {[string]}   [转换后的标准货币格式字符串]
 */
export function moneyCuter(s) {
    if (/[^0-9\.]/.test(s)) {
        return "0.00";
    }
    if (s == null || s == "") {
        return "0.00";
    }
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, "$1,$2");
    }
    s = s.replace(/,(\d\d)$/, ".$1");
    return s;
}
/*将数字不进行四舍五入地转化为小数点后几位的格式,如果当前精确位数小于目标位数则往后面加0
 * 目标位数默认为2，如果传入非数字则返回0.00
 * @param {number or string} num 需要转化的数字
 * @param {array} digits 需要截取的位数
 * */
export function cutNumberByDigits(num, digits) {
    if (digits === void 0) { digits = 2; }
    var numberNum = Number(num);
    var numberDigits = Number(digits);
    if (isNaN(numberNum)) {
        return '0.00';
    }
    if (isNaN(numberDigits))
        numberDigits = 2;
    return numberNum.toFixed(numberDigits + 1).slice(0, -1);
}
