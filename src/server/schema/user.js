// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义 id,nickname,email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
// const email = joi.string().email().required()
const email = joi.string().required()
// 定义 avatar 头像的验证规则
/*
    dataUri()指的是如下格式的字符串数据
    data:image/png;base 64,VE9PTUFOWVNFQ1JFVFM
 */
const user_pic = joi.string().required()
const avatar2 = joi.string().dataUri().required()
const avatar = joi.string().required()
const growthValue = joi.number()
const works = joi.number()
const follows = joi.number()
const followeds = joi.number()
const giftsReceived = joi.number()
const signature = joi.string()


// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,
        password,
    }
}
exports.reg_reguser_schema = {
    body:{
        username,
        password,
        user_pic:avatar2,
        nickname,
        email,
        growthValue,
        works,
        follows,
        followeds,
        giftsReceived,
        signature,
    }
}
/* exports.delete_user_schema = {
    body:{
        id
    }
} */
exports.update_userinfo_schema = {
    body:{
        id,
        username,
        nickname,
        email,
        user_pic,
        signature,
        growthValue,
        works,
        follows,
        followeds,
        giftsReceived,

    }
}
exports.update_password_schema = {
    body:{
        id,
        old_pwd:password,
        // 1. joi.ref('oldPwd')表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat用于合并 joi.not(joi.ref('oldPwd'))和 password这两条验证规则
        new_pwd:joi.not(joi.ref('oldPwd')).concat(password),
        re_pwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.update_avatar_schema = {
    body:{
        avatar,
        id
    }
}


// 定义验证注册和登录表单数据的规则对象
exports.reg_adminLogin_schema = {
    body:{
        username,
        password,
    }
}
exports.update_admininfo_schema = {
    body:{
        id,
        name:nickname,
        email,
    }
}