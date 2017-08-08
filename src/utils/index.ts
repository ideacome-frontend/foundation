
export { default as Timer } from './timer';
export type CallbackType = (arg: any) => void;

/**
 * 生成一个数字序列，包含从 `start` 递增到 `end` 的数字
 * @param start 数字开始
 * @param end 数字结束（包含）
 * @returns 数字数组
 */
export function numbersInRange(start: number, end: number): number[] {
    let arr: number[] = [];
    for (let i = start; i <= end; ++i) {
        arr.push(i);
    }
    return arr;
}

/**
 * 返回 `year` 年 `month` 月 全月天数
 * @param month 月份
 * @param year 年份
 */
export function daysInMonth(month: number, year: number): number {
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0) {
        return 31;
    } else if (month !== 2) {
        return 30;
    } else {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 29;
        } else {
            return 28;
        }
    }
}

/**
 * 加载**.js文件
 * scriptSrc 文件路径
 * successCallback 加载成功回调函数
 * script 标签id
 * content js标签内的内容
 */
export function loadJs(scriptSrc:string, successCallback?: CallbackType, id?:string, content?:string) {
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
 * name js文件名
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
/**
 * 微信分享设置
 * @param data
 */
export function wxShareHandle(data:{
    appId:string,
    timestamp:string,
    nonceStr:string,
    signature:string,
    shareInfo: any
}) {
    function setWxShareConfig(data) {
        const wx = window['wx'] || {};
        console.log('wx share data=',data)
        wx.config({
            debug:false,//开启调试模式
            appId: String(data.appId),//公众号的唯一标识
            timestamp: String(data.timestamp),//生成签名的时间戳
            nonceStr: String(data.nonceStr),//生成签名的随机串
            signature: String(data.signature),//签名
            jsApiList : ['onMenuShareAppMessage', 'onMenuShareTimeline' ] //需要使用的JS接口列表
        });
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title: data.shareInfo.title, // 分享标题
                desc: data.shareInfo.desc, // 分享描述
                link: data.shareInfo.link, // 分享链接
                imgUrl: data.shareInfo.imgUrl, // 分享图标
                // type: 'link', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                },
                fail : function(res) {
                    //失败
                }
            });
            wx.onMenuShareTimeline({
                title: data.shareInfo.timelineTitle || data.shareInfo.title, // 分享标题
                link: data.shareInfo.link, // 分享链接
                imgUrl: data.shareInfo.imgUrl, // 分享图标
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                },
                fail : function(res) {
                    //失败
                }
            });
            wx.error(function(res) {
                console.error('分享设置失败',res);
            });
        });
    }
    if (isIncludeJs('jweixin')){
        setWxShareConfig(data)
    } else {
        loadJs('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            setWxShareConfig(data)
        });/*加载外引js文件*/
    }
}
