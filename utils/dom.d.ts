/**
 * toast弹窗提示
 * @param text 提示内容
 * @param w 弹窗宽度
 * @param className 图标样式(toast需要带图标则必须传递该参数,参考my-copper.vue调用技巧)
 * @param callback 回调函数
 * @param hideTime 弹窗消失时间，默认2000毫秒
 */
export declare function hinting(text: string, w?: number, className?: string, callback?: Function, hideTime?: number): void;
/**
 * 正在加载中图标加文字
 * @param str
 **/
export declare function loadding(str: string): void;
/**
 * 添加加载动画
 */
export declare function showIndicator(): void;
/**
 * 删除加载动画
 */
export declare function hideIndicator(): void;
/**
 * [getAbsPos 获取元素在页面内的绝对坐标]
 * @param  target [选择器]
 * @return          [返回坐标的对象]
 */
export declare function getAbsPos(target: HTMLElement): {
    "X": number;
    "Y": number;
};
export declare function trigger(obj: HTMLElement, event: string): void;
