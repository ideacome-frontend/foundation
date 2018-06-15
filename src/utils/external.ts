
export type LoadJsCallback = (...args: any[]) => void;

/**
 * 加载**.js文件
 * @param scriptSrc 文件路径
 * @param successCallback 加载成功回调函数
 * @param script 标签id
 * @param content js标签内的内容
 */
export function loadJs(scriptSrc:string, successCallback?: LoadJsCallback, id?:string, content?:string) {
    //gets document head element
    var head = document.querySelector('head');
    if (head) {
        //creates a new script tag
        const script = document.createElement('script');
        //adds src and type to script tag
        script.type = 'text/javascript';
        script.src = scriptSrc;
        if (id) script.id = id;
        if (content) script.textContent = content;

        //calling a function after the js is loaded (Firefox)
        if (successCallback) script.onload = successCallback ;
        //append the script tag to document head element
        head.appendChild(script);
    }
}
/**
 * 是否已经加载过**.js文件
 * @param name js文件名
 */
export function isIncludeJs(name) {
    const scripts = document.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i]['src'].indexOf(name) > -1) {
            return true; //已加载
        }
    }
    return false;
}
