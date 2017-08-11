/**
 * 获取当前地理定位。用法：
 * ```javascript
 * getCurrentCoords((position) => {
 *  let coords = position.coords;
 *  // 使用 coords.latitude (纬度), coords.longitude (经度)
 * }, (error) => {
 * });
 * ```
 */
export declare function getCurrentCoords(successBack: PositionCallback, failBack?: PositionErrorCallback): void;
