import { hinting } from './dom'

/*压缩图片方法
* 详见 http://www.zhangxinxu.com/wordpress/2017/07/html5-canvas-image-compress-upload/
* @param {File} file
* @param {Function} callback
* @param {Number} limitMaxWidth
* @param {Number} limitMaxHeight
* @memberof Utils
* */
export function zipImage(file, callback, limitMaxWidth = 2000, limitMaxHeight = 2000) {
    // 压缩图片需要的一些元素和对象
    let reader = new FileReader(),
        img = new Image();
    if (file.type.indexOf("image") === 0) {
        reader.readAsDataURL(file);
    } else {
        hinting('请上传图片。');
        return;
    }
    let canvas = document.createElement('canvas');
    let context: any = canvas.getContext('2d');
    reader.onload = function (e: any) {
        img.src = e.target.result;
    };
    // base64地址图片加载完毕后
    img.onload = function () {
        // 图片原始尺寸
        let originWidth = (this as any).width;
        let originHeight = (this as any).height;
        console.log(`原图尺寸： ${originWidth} * ${originHeight}`);
        // 最大尺寸限制
        let maxWidth = limitMaxWidth,
            maxHeight = limitMaxHeight;
        // 目标尺寸
        let targetWidth = originWidth,
            targetHeight = originHeight;
        // 图片尺寸超过尺寸的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            console.log('超过图片大小限制，进入压缩');
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }
        console.log(`压缩后为尺寸为：${targetWidth} * ${targetHeight}`);
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // canvas转为blob并上传，做兼容性处理
        if (!HTMLCanvasElement.prototype.toBlob) {
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function (callback, type, quality) {
                    console.log('canvas.toBlob is not supported, use toDataURL polyfill instead');
                    let binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                        len = binStr.length,
                        arr = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }
                    callback(new Blob([arr], { type: type || 'image/png' }));
                }
            });
        }
        canvas.toBlob(function (blob: any) {
            callback(blob);
            console.log(`after zip size: ${blob.size / 1024} kb`);
        }, file.type || 'image/png');
    };
}
