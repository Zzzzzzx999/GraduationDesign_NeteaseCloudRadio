// 注册数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req,res)=>{
    const userinfo = req.body
    console.log(Object.keys(userinfo).length);
    /* if(!userinfo.username || !userinfo.password){
        res.cc('用户名或密码不合法！')
    } */
    // 定义sql语句,查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err) return res.cc(err)
        // 判断用户名是否被占用
        if(results.length>0){
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 调用bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        
        // 定义插入新用户的 SQL 语句
        const sqlStr = 'insert into ev_users set ?'
        let info = {username:userinfo.username,password:userinfo.password}
        if (Object.keys(userinfo).length >3) {
            info = {username:userinfo.username,
                    password:userinfo.password,
                    user_pic:userinfo.user_pic,
                    nickname:userinfo.nickname,
                    email:userinfo.email,
                    growthValue:userinfo.growthValue,
                    works:userinfo.works,
                    follows:userinfo.follows,
                    followeds:userinfo.followeds,
                    giftsReceived:userinfo.giftsReceived,
                    signature:userinfo.signature,}
        }
        db.query(sqlStr,info,(err,results)=>{
            if(err) return res.cc(err)
            if (results.affectedRows !==1 )  return res.cc('注册用户失败,请稍后再试!')
            // 注册成功
            res.send({
                status:0,
                message:'注册成功！',
                profile:results,
                info:info
            })
        })
    })
    // res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req,res)=>{
    console.log('req',req);
    const userinfo = req.body
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err) return res.send({
            status:1,
            err:message,
            data:req
        })
        // if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('账号未注册！')
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult) return res.cc('账号或者密码有误噢!')
        // res.send('login OK')
        // 在服务器端生成 Token 的字符串
        const user = {...results[0],password:'',user_pic:''}
        // 对用户的信息进行加密,生成 Token 字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        // 调用res.send() 将token响应给客户端


        res.send({
            status:0,
            message:'登陆成功！',
            token:'bearer ' + tokenStr,
            profile:results[0]
        })
    })
}

exports.delete = (req,res)=>{
    const sqlStr = 'delete from ev_users where id = ?'
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    db.query(sqlStr,req.query.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除用户失败！')
        res.cc('删除用户成功！',0)
    })
}