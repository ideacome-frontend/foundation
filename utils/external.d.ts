export declare type LoadJsCallback = (...args: any[]) => void;
/**
 * 加载**.js文件
 * @param scriptSrc 文件路径
 * @param successCallback 加载成功回调函数
 * @param script 标签id
 * @param content js标签内的内容
 */
export declare function loadJs(scriptSrc: string, successCallback?: LoadJsCallback, id?: string, content?: string): void;
/**
 * 是否已经加载过**.js文件
 * @param name js文件名
 */
export declare function isIncludeJs(name: any): boolean;
