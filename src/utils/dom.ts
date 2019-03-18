/**
 * toast弹窗提示
 * @param text 提示内容
 * @param w 弹窗宽度
 * @param className 图标样式(toast需要带图标则必须传递该参数,参考my-copper.vue调用技巧)
 * @param callback 回调函数
 * @param hideTime 弹窗消失时间，默认2000毫秒
 */
export function hinting(text: string, w?: number, className?: string, callback?: Function, hideTime: number = 2000) { //提示窗口
    if (!w) w = 66;
    let newbox: any = document.createElement("div");
    if (className) {
        newbox.innerHTML = "<i class='icon wp35 mh40 " + className + "'></i><br /><span>" + text + "</span>";
    } else {
        newbox.innerHTML = text;
    }
    newbox.id = "createBox";
    newbox.style.cssText = "width:" + w + "%; z-index:15000 ; border-radius:.3em; text-align: center; line-height: 25px; color:rgba(255,255,255,0) ; padding:.5rem 0; background: rgba(0,0,0,0); position: fixed; top:50%; left:50%; margin-left:-" + w / 2 + "%; margin-top: -20px; -webkit-transition: all .5s ease;"
    if (document.getElementById(newbox.id) == null) {
        document.body.appendChild(newbox);
        setTimeout(function () {
            newbox.style.background = 'rgba(0,0,0,.7)';
            newbox.style.color = 'rgba(255,255,255,1)'
        }, 100);
        setTimeout(function () {
            newbox.style.background = 'rgba(0,0,0,0)';
            newbox.style.color = 'rgba(255,255,255,0)'
        }, hideTime);
        setTimeout(function () {
            newbox.parentNode.removeChild(newbox);
            if (typeof callback === 'function') {
                callback();
            }
        }, hideTime + 500)
    }
}

/**
 * 正在加载中图标加文字
 * @param str
 **/
export function loadding(str: string) {
    let parentNode = document.body;
    const overlayNode = document.getElementsByClassName('preloader-indicator-overlay')[0];
    const modalNode = document.getElementsByClassName('preloader-indicator-modal')[0];
    if (overlayNode && modalNode) {
        parentNode.removeChild(overlayNode);
        parentNode.removeChild(modalNode)
    }
    let htmlStr = '<div class="preloader-indicator-overlay"></div>' +
        '<div class="preloader-indicator-modal">' +
        '   <span class="preloader preloader-white auto"></span>' +
        '   <p class="white tac mt8 fs13">' + str + '</p>' +
        '</div>';
    parentNode.insertAdjacentHTML('beforeend', htmlStr);
    let nodeEle: any = document.getElementsByClassName('preloader-indicator-modal')[0],
        width = nodeEle.offsetWidth,
        height = nodeEle.offsetHeight;
    let setStyle = `margin-left:-${width / 2}px;margin-top:-${height / 2}px`;
    nodeEle.setAttribute('style', setStyle);
}

/**
 * 添加加载动画
 */
export function showIndicator() {
    if (document.getElementsByClassName('preloader-indicator-overlay').length > 0) return;
    const htmlStr = '<div class="preloader-indicator-overlay"></div>' +
        '<div class="preloader-indicator-modal">' +
        '<span class="preloader preloader-white"></span>' +
        '</div>';
    document.body.insertAdjacentHTML('beforeend', htmlStr);
}

/**
 * 删除加载动画
 */
export function hideIndicator() {
    const parentNode = document.body;
    const overlayNode = document.getElementsByClassName('preloader-indicator-overlay')[0];
    const modalNode = document.getElementsByClassName('preloader-indicator-modal')[0];
    if (overlayNode && modalNode) {
        parentNode.removeChild(overlayNode);
        parentNode.removeChild(modalNode);
    }
}

/**
 * [getAbsPos 获取元素在页面内的绝对坐标]
 * @param  target [选择器]
 * @return          [返回坐标的对象]
 */
export function getAbsPos(target: HTMLElement) {
    return {
        "X": getAbsoluteLeft(target),
        "Y": getAbsoluteTop(target)
    };

    //获取控件左绝对位置
    function getAbsoluteLeft(o: HTMLElement) {
        let oLeft = o.offsetLeft;
        while (o.offsetParent != null) {
            let oParent = o.offsetParent as HTMLElement;
            oLeft += oParent.offsetLeft;
            o = oParent
        }
        return oLeft;
    }

    //获取控件上绝对位置
    function getAbsoluteTop(o: HTMLElement) {
        let oTop = o.offsetTop;
        while (o.offsetParent != null) {
            let oParent = o.offsetParent as HTMLElement;
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
export function trigger(obj: HTMLElement, event: string) {
    let eventArr = event.split(' ');
    for (let item of eventArr) {
        //如focus blur click等事件直接触发
        //否则创建事件并触发
        if (typeof obj[item] === 'function') {
            obj[item]();
        } else if ('dispatchEvent' in obj) {
            let newEvent = new Event(item);
            obj.dispatchEvent(newEvent);
        }
    }
}