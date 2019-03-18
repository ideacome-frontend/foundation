/**
 * [getAbsPos 获取元素在页面内的绝对坐标]
 * @param  target [选择器]
 * @return          [返回坐标的对象]
 */
export function getAbsPos(target) {
    return {
        "X": getAbsoluteLeft(target),
        "Y": getAbsoluteTop(target)
    };
    //获取控件左绝对位置
    function getAbsoluteLeft(o) {
        var oLeft = o.offsetLeft;
        while (o.offsetParent != null) {
            var oParent = o.offsetParent;
            oLeft += oParent.offsetLeft;
            o = oParent;
        }
        return oLeft;
    }
    //获取控件上绝对位置
    function getAbsoluteTop(o) {
        var oTop = o.offsetTop;
        while (o.offsetParent != null) {
            var oParent = o.offsetParent;
            oTop += oParent.offsetTop;
            o = oParent;
        }
        return oTop;
    }
}
/*  trigger 手动触发事件
 *  @param obj [DOM] 事件发生的对象
 *  @param event [string] 触发的事件，事件之间使用空格分隔。
 *  如：'input change'
 * */
export function trigger(obj, event) {
    var eventArr = event.split(' ');
    for (var _i = 0, eventArr_1 = eventArr; _i < eventArr_1.length; _i++) {
        var item = eventArr_1[_i];
        //如focus blur click等事件直接触发
        //否则创建事件并触发
        if (typeof obj[item] === 'function') {
            obj[item]();
        }
        else if ('dispatchEvent' in obj) {
            var newEvent = new Event(item);
            obj.dispatchEvent(newEvent);
        }
    }
}
