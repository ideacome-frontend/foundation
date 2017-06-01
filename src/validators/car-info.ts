import { trimAll } from "../transform/string";

/**
 * 验证车牌有效性；除去前缀，例如浙A，普通车牌后面有5位数字字母组合，新能源会有6位。
 * @param plateNumber 车牌
 */
export function isValidPlate(plateNumber: string): boolean {
    let p = trimAll(plateNumber.toUpperCase());
    let r = RegExp("^[宁冀鄂吉云皖蒙甘渝津粤沪京港新澳贵辽琼桂晋苏黑青陕藏浙湘川赣豫鲁台闽][A-HJ-NP-Z][A-HJ-NP-Z0-9]{5,6}$");
    return r.test(p);
}

/**
 * 校验车辆VIN码
 * @param vinNumber 车辆VIN码
 * @returns 0表示条件一：VIN码只能录入数字和字母，且不能含I、O、Q 没有满足;1表示满足条件一的前提下第9位加权算法不符合;2表示满足条件一的前提下第9位也符合
 */
export function validateVin(vinNumber: string): number {
    let v = trimAll(vinNumber.toUpperCase());
    let r = /^((?![IOQ])[A-Z\d]){17}$/g;
    if (!r.test(v)) {
        return 0;
    } else {
        let letterGroup = ['', 'AJ', 'BKS', 'CLT', 'DMU', 'ENV', 'FW', 'GPX', 'HY', 'RZ'];
        let weight = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

        function letterToN(letter: string): number {
            let n: number;
            n = parseInt(letter);
            if (isNaN(n)) {
                letterGroup.forEach((group, index) => {
                    if (group.indexOf(letter) != -1) {
                        n = index;
                    }
                });
            }
            return n;
        }

        let sum = v.split('')
            .map(letterToN)
            .reduce((p, n, i) => {
                return p + n * weight[i];
            });
        let remainder = sum % 11;
        let checkCode: string;
        if (remainder === 10) {
            checkCode = 'X';
        } else {
            checkCode = remainder + '';
        }
        if (v.substr(8, 1) === checkCode) {
            return 2;
        } else {
            return 1;
        }
    }
}

/**
 * 验证发动机号
 * @param engineNumber 发动机号
 */
export function isValidEngineNumber(engineNumber: string): boolean {
    let r = /^[0-9A-Za-z\-\－\u4e00-\u9fa5]{1,20}$/;
    return r.test(trimAll(engineNumber));
}
