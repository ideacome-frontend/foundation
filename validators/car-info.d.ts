/**
 * 验证车牌有效性；除去前缀，例如浙A，普通车牌后面有5位数字字母组合，新能源会有6位。
 * @param plateNumber 车牌
 */
export declare function isValidPlate(plateNumber: string): boolean;
/**
 * 校验车辆VIN码
 * @param vinNumber 车辆VIN码
 * @returns 0表示条件一：VIN码只能录入数字和字母，且不能含I、O、Q 没有满足;1表示满足条件一的前提下第9位加权算法不符合;2表示满足条件一的前提下第9位也符合
 */
export declare function validateVin(vinNumber: string): number;
/**
 * 验证发动机号
 * @param engineNumber 发动机号
 */
export declare function isValidEngineNumber(engineNumber: string): boolean;
/**
 * 判断是否为单位车
 * @param name 公司名
 * 单位车 false
 * 家庭自用车 true
 */
export declare function isNotCompanyCar(name: string): boolean;
