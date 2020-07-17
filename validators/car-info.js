import config from './config';
import { trimAll } from "../transform/string";
/**
 * 验证车牌有效性；除去前缀，例如浙A，普通车牌后面有5位数字字母组合，新能源会有6位。
 * @param plateNumber 车牌
 */
export function isValidPlate(plateNumber) {
    var p = plateNumber.toUpperCase();
    p = config.trim ? trimAll(p) : p;
    var r = RegExp("^[宁冀鄂吉云皖蒙甘渝津粤沪京港新澳贵辽琼桂晋苏黑青陕藏浙湘川赣豫鲁台闽][A-HJ-NP-Z][A-HJ-NP-Z0-9]{5,6}$");
    return r.test(p);
}
/**
 * 校验车辆VIN码
 * @param vinNumber 车辆VIN码
 * @returns 0表示条件一：VIN码只能录入数字和字母，且不能含I、O、Q 没有满足;1表示满足条件一的前提下第9位加权算法不符合;2表示满足条件一的前提下第9位也符合
 */
export function validateVin(vinNumber) {
    var v = vinNumber.toUpperCase();
    v = config.trim ? trimAll(v) : v;
    var r = /^((?![IOQ])[A-Z\d]){17}$/g;
    var letterGroup = ['', 'AJ', 'BKS', 'CLT', 'DMU', 'ENV', 'FW', 'GPX', 'HY', 'RZ'];
    var weight = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    function letterToN(letter) {
        var n;
        n = parseInt(letter);
        if (isNaN(n)) {
            letterGroup.forEach(function (group, index) {
                if (group.indexOf(letter) != -1) {
                    n = index;
                }
            });
        }
        return n;
    }
    if (!r.test(v)) {
        return 0;
    }
    else {
        var sum = v.split('')
            .map(letterToN)
            .reduce(function (p, n, i) {
            return p + n * weight[i];
        }, 0);
        var remainder = sum % 11;
        var checkCode = void 0;
        if (remainder === 10) {
            checkCode = 'X';
        }
        else {
            checkCode = remainder + '';
        }
        if (v.substr(8, 1) === checkCode) {
            return 2;
        }
        else {
            return 1;
        }
    }
}
/**
 * 验证发动机号
 * @param engineNumber 发动机号
 */
export function isValidEngineNumber(engineNumber) {
    var r = /^[0-9A-Za-z\-\－\u4e00-\u9fa5]{1,32}$/;
    return r.test(config.trim ? trimAll(engineNumber) : engineNumber);
}
/**
 * 判断是否为单位车
 * @param name 公司名
 * 单位车 false
 * 家庭自用车 true
 */
export function isNotCompanyCar(name) {
    var noInputAttr = ['公司', '集团', '基金', '合作社', '团体', '协会', '银行', '政府', '局', '事务所', '法院', '医院', '大学', '中学', '小学', '幼儿园', '街道', '社区', '办事处', '厂'];
    var flag = true;
    if (name && name.length > 4) {
        for (var _i = 0, noInputAttr_1 = noInputAttr; _i < noInputAttr_1.length; _i++) {
            var item = noInputAttr_1[_i];
            if (name.indexOf(item) !== -1) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
