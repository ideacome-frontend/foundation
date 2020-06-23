import { isIncludeJs, loadJs } from "./external";
/**
 * 微信分享设置
 * @param data
 */

export function wxShareHandle(data) {
    function setWxShareConfig(data) {
        var wx = window['wx'] || {};
        console.log('wx share data=', data);
        wx.config({
            debug: false,
            appId: String(data.appId),
            timestamp: String(data.timestamp),
            nonceStr: String(data.nonceStr),
            signature: String(data.signature),
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] //需要使用的JS接口列表
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: data.shareInfo.title,
                desc: data.shareInfo.desc,
                link: data.shareInfo.link,
                imgUrl: data.shareInfo.imgUrl,
                // type: 'link', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {
                    //失败
                }
            });
            wx.onMenuShareTimeline({
                title: data.shareInfo.timelineTitle || data.shareInfo.title,
                link: data.shareInfo.link,
                imgUrl: data.shareInfo.imgUrl,
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {
                    //失败
                }
            });
            wx.error(function (res) {
                console.error('分享设置失败', res);
            });
        });
    }
    if (isIncludeJs('jweixin')) {
        setWxShareConfig(data);
    }
    else {
        loadJs('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            setWxShareConfig(data);
        }); /*加载外引js文件*/
    }
}
