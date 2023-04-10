// 导入 express 模块
const express = require('express')

// 创建路由对象
const router = express.Router() 

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
const {reg_login_schema,reg_reguser_schema,delete_user_schema} = require('../schema/user')

// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser)
// 后台管理注册新用户
router.post('/reguserManage',expressJoi(reg_reguser_schema),user_handler.regUser)
// 登录
router.post('/login',expressJoi(reg_login_schema),user_handler.login)
// 删除用户
router.get('/delete',user_handler.delete)

module.exports = router
