// 导入 express 模块
const express = require('express')

// 创建路由对象
const router = express.Router() 

// 导入用户路由处理函数对应的模块
const admin_handler = require('../router_handler/admin')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
const {reg_adminLogin_schema} = require('../schema/user')

// 注册新用户
router.post('/regadmin',expressJoi(reg_adminLogin_schema),admin_handler.regAdmin)
// 登录
router.post('/login',expressJoi(reg_adminLogin_schema),admin_handler.login)

module.exports = router
