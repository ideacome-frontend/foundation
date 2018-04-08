import { isIncludeJs,loadJs } from "./index";

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
