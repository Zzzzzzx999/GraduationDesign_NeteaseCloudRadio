const express = require('express')
const router = express.Router()

const adminInfo_handler = require('../router_handler/admininfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_admininfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')


// 获取用户信息的路由
router.get('/adminInfo',adminInfo_handler.getUserInfo)
// 更新用户信息的路由
router.post('/adminInfo',expressJoi(update_admininfo_schema),adminInfo_handler.updateAdminInfo)
// 更新密码的路由
router.post('/updateAdminPwd',expressJoi(update_password_schema),adminInfo_handler.updatePassword)
// 更新头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),adminInfo_handler.updateAvatar)

module.exports = router