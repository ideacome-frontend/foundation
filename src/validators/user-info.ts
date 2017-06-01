import { trimAll } from "../transform/string";

/**
 * 验证身份证号码
 * @param idNumber 身份证号码
 */
export function isValidID(idNumber: string): boolean {
    let city: any = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    let code = trimAll(idNumber.replace('x', 'X'));
    if (!code || !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        return false;
    } else if (!city[code.substr(0, 2)]) {
        return false;
    } else {
        if (code.length === 18) {
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = code.slice(0, -1).split('')
                .map((letter, index) => {
                    return factor[index] * parseInt(letter);
                })
                .reduce((s, v) => s + v);
            return parity[sum % 11] + '' === code.slice(-1);
        }
    }
    return true;
}

/**
 * 验证邮箱
 * @param email 邮箱
 */
export function isValidEmail(email: string): boolean {
    let r = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return r.test(email);
}

/**
 * 验证手机号
 * @param phone 手机号
 */
export function isValidCellphone(phone: string): boolean {
    let r = /^1[3,4,5,7,8]\d{9}$/;
    return r.test(trimAll(phone));
}

/**
 * 验证银行卡号
 * @param cardNumber 银行卡号
 */
export function isValidBankCardNumber(cardNumber: string): boolean {
    let r = /^[0-9]{16,21}$/;
    return r.test(trimAll(cardNumber));
}

export { isAllChinese, hasChinese } from './string';
