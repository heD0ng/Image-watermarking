import { warnMessage } from "./warnMessage";
import { uploadFile, pressImg } from '../src/api/index';

export function isImgFile(file) {
    if (!file.files[0]) return false
    let types = ['png', "jpg", "jpeg"]
    let fileType = file.files[0].type.split('/')[1];
    if (!types.includes(fileType)) {
        warnMessage('warning', '这不是图片文件')
        return false;
    }
    return true
}

export async function uploadImgAndPress(file) {
    let formData = new FormData()
    formData.append('img', file.files[0])
    const fileAfterUpload = await uploadFile(formData)
    console.log(fileAfterUpload);
    const url = fileAfterUpload.data.url
    console.log(url);
    // console.log(pressImg(url));
    return await pressImg(url);
}

/**
 * 获取图片的绝对路径
 * @param res 压缩图片后的地址
 * @returns {string}
 */
export function getImgUrl(res) {
    let pre = import.meta.env.DEV ? proxyConfig : '.';
    return pre + res.data.url.split('public')[1];
}

export function sureUpload(id) {
    document.querySelector(`#${id}`).click();
}