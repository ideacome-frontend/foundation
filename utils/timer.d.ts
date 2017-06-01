export interface TimerOptions {
    seconds: number;
    checkSoon?: boolean;
    tick?: (secondsLeft: number) => void;
    done?: () => void;
}
/**
 * 使用 `Timer` 类来倒计时。
 * 用法：
 * ```javascript
 * let timer = new Timer({
 *  seconds: 10,
 *  checkSoon: true, // 当包含这个参数并且为 `true` 时，会马上执行 `tick` 回调
 *  tick: (secondsLeft) => { console.log(secondsLeft); },
 *  done: () => { console.log('done'); }
 * });
 * // 如果需要停止倒计时，使用 `stop()` 方法
 * timer.stop();
 * ```
 */
export default class Timer {
    private options;
    private startTime;
    private stopped;
    private handle;
    constructor(options: TimerOptions);
    check(): void;
    stop(): void;
}
