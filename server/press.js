// 压缩图片
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const { exitsFolder } = require("../util/file");
const { successMsg } = require("../util/message");
const { exitsFile } = require("../util/file");
const images = require("images");


const {timerClearFile} = require("../util/timer");

const pressImgOutPath = './../public/upload/pressImg'


router.get('/', async (req, res, next) => {
    const fileName = req.query.fileName;
    try {
        // 是否存在文件，存在输出文件夹
        if (await exitsFile(fileName)) {
            await exitsFolder(pressImgOutPath)
            console.log(fileName)
            // console.log(imagemin)
            // 压缩文件
            // const files = await imagemin([fileName], {
            //     glob: false,
            //     destination: path.resolve(__dirname, pressImgOutPath),
            //     plugins: [
            //         imageminJpegtran(),
            //         imageminPngquant({
            //             quality: [0.6, 0.8]
            //         })
            //     ]
            // })
            // console.log(files);
            // // 需要读取文件
            // const pressFilePath = files[0].destinationPath;
            const file = Date.now() + '-' + Math.random().toString(16)+ '.png';
            const pressFilePath =  path.resolve(__dirname, pressImgOutPath, file);
            console.log(pressFilePath);
            images(fileName).save(pressFilePath, {
                quality : 60
            })
            const fileStats = await fs.promises.stat(pressFilePath)
            const obj = successMsg('压缩成功', {
                url: pressFilePath,
                size: fileStats.size,
            })
            res.status(200).send(obj);
            timerClearFile(pressFilePath, 30 * 60)
        } else {
            new Error('the file is not exits');
        }
    } catch (e) {
        // throw new Error(e);
        next(e)
    }
    next();
})

module.exports = router;
