const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer')
const fileStorage = './../public/upload/origin/'
const { exitsFolder } = require("../util/file");

const storage = multer.diskStorage({
    // 存储位置
    destination: async function (req, file, cb) {
        try {
            await exitsFolder(fileStorage);
        } catch (e) {
            throw Error(e.msg);
        }
        cb(null, path.resolve(__dirname, fileStorage));
    },
    // 命名
    filename: async function (req, file, cb) {
        const extName = path.extname(file.originalname)
        const fileName = Date.now() + '-' + Math.random().toString(36).slice(-6) + extName
        cb(null, fileName)
    }
})
// 
const fileFilter = (req, file, cb) => {
    const types = ['.png', '.jpg', '.jpeg', '.gif']
    const extName = path.extname(file.originalname)
    if (types.includes(extName)) {
        cb(null, true)
    } else {
        cb(new Error('I don\'t accept the type if this file!'))
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: {
        // 文件大小：10M
        fileSize: 10 * 1024 * 1024
    }
})

router.post('/', upload.single('img'), (req, res) => {
    const fileStoragePath = path.resolve(__dirname, fileStorage, req.file.filename)
    const obj = {
        code: 200,
        msg: '图片上传成功',
        data: {
            url: fileStoragePath
        }
    }
    res.status(200).send(obj);
})

module.exports = router;