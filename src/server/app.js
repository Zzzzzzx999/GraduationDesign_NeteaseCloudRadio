// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi= require('@hapi/joi')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())
// 配置解析 application/x-www-form-urlencoded 表单数据的中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// 一定要在路由之前,封装 res.cc 函数
app.use((req,res,next)=>{
    // status 默认值为1,表示失败的情况
    // err 的值，可能是一个错误对象,也可能是一个错误的字符串
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
// app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))
// app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/my/]}))

                        // 用户专区
// 导入并使用用户模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)
// 导入并使用电台分类
const stationCateRouter = require('./router/stationcate')
app.use('/my/station',stationCateRouter)
// 导入并使用电台的路由模块
const stationRouter = require('./router/station')
app.use('/my/station',stationRouter)
// 导入并使用banner的路由模块
const bannerRouter = require('./router/banner')
app.use('/my/banner',bannerRouter)
// 导入并使用upload的路由模块
const uploadRouter = require('./router/upload')
app.use('/my/upload',uploadRouter)

                        // 管理员专区
// 导入并使用管理员模块
const adminRouter = require('./router/admin')
app.use('/apiAdmin',adminRouter)
// 导入并使用管理员信息的路由模块
const adminInfoRouter = require('./router/admininfo')
app.use('/admin',adminInfoRouter)

// 定义错误级别的中间件
app.use((err,req,res,next)=>{
    // 验证失败导致的错误
    // if(err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3000,()=>{
    console.log('Express server running at http://127.0.0.1:3000');
})