import { isIncludeJs, loadJs } from "./external";

interface wxBaseInfo {
    appId:string,
    timestamp:string,
    nonceStr:string,
    signature:string,
    shareInfo: any
}
/**
 * 微信分享设置
 * @param data
 */
export function wxShareHandle(data:wxBaseInfo) {
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


/**
 * 添加页面关闭和 禁用分享功能
 * @param {Object} data 请求签名接口返回的数据
 * @param {String} type 微信sdk中功能
 */
export function wxConfigHandle(data:wxBaseInfo,type:string,menuList:string[]=[]) {
    function setWxShareConfig(data:wxBaseInfo) {
        var wx = window['wx'] || {};
        console.log('wx share data=', data);
        wx.config({
            debug: false,
            appId: String(data.appId),
            timestamp: String(data.timestamp),
            nonceStr: String(data.nonceStr),
            signature: String(data.signature),
            jsApiList:['onMenuShareAppMessage', 'onMenuShareTimeline','hideAllNonBaseMenuItem','hideMenuItems'] //需要使用的JS接口列表
        });
        wx.ready(function () {
            switch (type) {
                case 'hide':
                    wx.hideAllNonBaseMenuItem()
                    break;
                case 'close':
                    wx.closeWindow();
                    break;
                case 'hideMenu':
                    wx.hideMenuItems({
                        menuList
                    })
            }
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
interface WxpayParams {
    signType:string;
    paySign:string;
    timeStamp:string;
    packageInfo:string;
    appId:string;
    flowId:string;
    nonceStr:string
}
export function wxPayHanlde(data:WxpayParams,
    {success,cancel,fail}) {
    function setWxPayConfig(data:WxpayParams){
        var wx = window['wx'] || {};
        console.log('wx share data=', data);
        wx.config({
            debug: false,
            appId: String(data.appId),
            timestamp: String(data.timeStamp),
            nonceStr: String(data.nonceStr),
            signature: String(data.paySign),
            jsApiList:['chooseWXPay'] //需要使用的JS接口列表
        });
        wx.ready(function () {
            wx.chooseWXPay({
                timestamp: String(data.timeStamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: String(data.nonceStr), // 支付签名随机串，不长于 32 位
                package: String(data.packageInfo), // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: String(data.signType), // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: String(data.paySign), // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数         
                  success && success()
                },
                cancel: function (res) {
                    // 用户取消分享后执行的回调函数
                    cancel && cancel()
                },
                fail: function (fail) {
                    //失败
                    fail && fail()
                }
              });
        })
    }
    if (isIncludeJs('jweixin')) {
        setWxPayConfig(data);
    }
    else {
        loadJs('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            setWxPayConfig(data);
        }); /*加载外引js文件*/
    }
}