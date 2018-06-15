import { trimAll } from "../transform/string";
import { isDate } from "./string";
/**
 * 验证身份证号码
 * @param idNumber 身份证号码
 */
export function isValidID(idNumber) {
    if (idNumber === void 0) { idNumber = ''; }
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    var code = trimAll(idNumber.replace('x', 'X'));
    var year = code.substr(6, 4), month = code.substr(10, 2), date = code.substr(12, 2); //身份证年月日
    var time = year + '-' + month + '-' + date; //身份证日期时间戳date
    if (!code || !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        return false;
    }
    else if (!city[code.substr(0, 2)]) {
        return false;
    }
    else if (!isDate(time)) { //校验年月日
        return false;
    }
    else {
        if (code.length === 18) {
            var factor_1 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = code.slice(0, -1).split('')
                .map(function (letter, index) {
                return factor_1[index] * parseInt(letter);
            })
                .reduce(function (s, v) { return s + v; });
            return parity[sum % 11] + '' === code.slice(-1);
        }
    }
    return true;
}
/**
 * 验证邮箱
 * @param email 邮箱
 */
export function isValidEmail(email) {
    var r = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return r.test(email);
}
/**
 * 验证手机号
 * @param phone 手机号
 */
export function isValidCellphone(phone) {
    var r = /^1[3,4,5,6,7,8,9]\d{9}$/;
    return r.test(trimAll(phone));
}
/**
 * 验证银行卡号
 * @param cardNumber 银行卡号
 */
export function isValidBankCardNumber(cardNumber) {
    var r = /^[0-9]{16,21}$/;
    return r.test(trimAll(cardNumber));
}
/**
 * 验证密码
 * 规则：8-16位数字和字母组成的字符串
 * */
export function isValidPassword(password) {
    var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    return patrn.test(password);
}
export { isAllChinese, hasChinese } from './string';
