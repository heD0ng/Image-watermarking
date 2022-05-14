// 定时工具类
const fs = require('fs');
// const {otherLogger} = require("../config/logger");
const {exitsFile} = require("./file");


/**
 * 定时清理文件
 * @param time {Number} 秒
 * @param filePath {String} 文件的路径
 */
const timerClearFile = function (filePath, time = 30 * 60,) {
    let timer = null;
    timer = setTimeout(async _ => {
        // 如果传入的图片存在，需要进行删除
        if (await exitsFile(filePath)) {
            await fs.promises.unlink(filePath);
            // otherLogger.info(`我删除的文件是${filePath}`)
            clearTimeout(timer);
            timer = null;
        }
    }, time * 1000)
}

module.exports = {
    timerClearFile
}