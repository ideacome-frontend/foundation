/**
 * 获取当前地理定位
 * @return {
      {
        latitude:30.283514799999995  纬度
        longitude:120.0689091   经度
      }
    }
 */
export function getCurrentCoords(successBack, failBack) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successBack, failBack, { timeout: 3000 });
    }
}
