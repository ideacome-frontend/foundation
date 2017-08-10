export type CallbackType = (arg: any) => void;

/**
 * 获取当前地理定位
 * @successBack {
      {
        latitude:30.283514799999995  纬度
        longitude:120.0689091   经度
      }
    }
 */
export function getCurrentCoords(successBack: CallbackType, failBack: CallbackType) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successBack, failBack, { timeout: 3000 });
    }
}

