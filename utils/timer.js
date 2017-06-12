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
var Timer = (function () {
    function Timer(options) {
        var _this = this;
        this.options = options;
        this.startTime = Date.now();
        this.stopped = false;
        this.handle = setInterval(function () { _this.check(); }, 1000);
        if (this.options.checkSoon) {
            setTimeout(function () { _this.check(); }, 0);
        }
    }
    Timer.prototype.check = function () {
        var now = Date.now();
        var passed = Math.ceil((now - this.startTime) / 1000);
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
    };
    Timer.prototype.stop = function () {
        if (this.stopped) {
            return;
        }
        clearInterval(this.handle);
        this.stopped = true;
    };
    return Timer;
}());
export default Timer;
