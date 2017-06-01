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
    constructor(options) {
        this.options = options;
        this.startTime = Date.now();
        this.stopped = false;
        this.handle = setInterval(() => { this.check(); }, 1000);
        if (this.options.checkSoon) {
            setTimeout(() => { this.check(); }, 0);
        }
    }
    check() {
        let now = Date.now();
        let passed = Math.ceil((now - this.startTime) / 1000);
        if (passed >= this.options.seconds) {
            if (this.options.done) {
                this.options.done.call(null);
            }
            this.stop();
        }
        else {
            if (this.options.tick) {
                this.options.tick.call(null, this.options.seconds - passed);
            }
        }
    }
    stop() {
        if (this.stopped) {
            return;
        }
        clearInterval(this.handle);
        this.stopped = true;
    }
}
