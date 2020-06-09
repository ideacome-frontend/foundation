/**
 * [getAbsPos 获取元素在页面内的绝对坐标]
 * @param  target [选择器]
 * @return          [返回坐标的对象]
 */
export declare function getAbsPos(target: HTMLElement): {
    X: number;
    Y: number;
};
export declare function trigger(obj: HTMLElement, event: string): void;
