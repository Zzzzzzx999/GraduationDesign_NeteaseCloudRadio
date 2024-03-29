const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')


// 获取用户信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo)
// 获取用户信息的路由
router.get('/userlist',userinfo_handler.getUserList)
// 更新用户信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
// 更新密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
// 更新头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

// 获取用户收藏的路由
router.get('/collect',userinfo_handler.getCollectList)
// 更新用户收藏的路由
router.post('/updateCollect',userinfo_handler.updateCollect)

module.exports = router