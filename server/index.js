const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()


const history = require('connect-history-api-fallback');
app.use(history({
    index: '/html/index.html',
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'], // 不加这一行，后面有的请求会被拦截
    rewrites: [ // 匹配到api开头的，继续向下传递
        {
            from: /^\/api/,
            to: function (context) {
                return context.parsedUrl.path;
            }
        }
    ]
}));

// 使用静态资源的中间件
app.use(express.static(path.resolve(__dirname, '../public'),{
    index: ['html/index.html'],
    redirect: true,
    setHeaders: function (res, path, stat) {
        res.set("Access-Control-Allow-Origin","*")
    },

}));

app.options('*', cors())
app.use(cors({
    "origin": "*", // 维护运行的的源头
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 允许的请求方法名
    "allowedHeaders": ['Authorization'], // 允许的请求头
    "preflightContinue": true, // 解析完后，给下一个中间件
    "optionsSuccessStatus": 200 // 响应的结果
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/upload', require('./upload'))
app.use('/api/pressImg', require('./press'))

app.use(require('../middleware/errorMiddleware'))

app.listen(8083, () => {
    console.log('我在监听8083端口')
})