export declare type CallbackType = (arg: any) => void;
/**
 * 获取当前地理定位
 * @successBack {
      {
        latitude:30.283514799999995  纬度
        longitude:120.0689091   经度
      }
    }
 */
export declare function getCurrentCoords(successBack: CallbackType, failBack: CallbackType): void;
