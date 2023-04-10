const db = require('../db/index.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req,res)=>{
    const sqlStr = 'select * from ev_users where id=?'
    // const sqlStr = 'select * from ev_users'
    console.log(req);
    db.query(sqlStr,req.query.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status:0,
            message:'获取用户信息成功！',
            profile:results
        })
    })
}
// 更新用户基本信息的处理函数
exports.updateUserInfo = (req,res)=>{
    const userInfo = req.body

    // const base64Image = userInfo.user_pic // 从请求体中获取Base64编码的图片字符串
    // const imageBuffer = Buffer.from(base64Image, 'base64'); // 将Base64编码的字符串转换为Buffer对象
    /* const filename = `image${userInfo.id}.png`; // 生成唯一的文件名
    const filepath = `../static/uploads/${filename}`; // 设置文件路径
    fs.writeFile(filepath, imageBuffer, (err) => {
        if (err) throw err;
        console.log('图片已保存');
        userInfo.user_pic = `/uploads/${filename}`
    }); */
    /* const imagePath = path.join(__dirname, filepath);
    const image = fs.readFileSync(imagePath);
    const base64Image2 = Buffer.from(image).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Image2}`;  
    userInfo.user_pic = imageUrl */

    const sqlStr = 'update ev_users set ? where id=?'
    console.log(req.body);
    db.query(sqlStr,[userInfo,userInfo.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户的基本信息失败!')
        // res.cc('更新用户信息成功',0)
        res.send({
            status:0,
            message:'更新用户信息成功！',
            profile:req.body
        })
    })
}
// 更新用户密码的处理函数
exports.updatePassword = (req,res)=>{
    // 根据 id 查询用户的信息
    const sqlStr = 'select * from ev_users where id = ?'
    db.query(sqlStr,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1 ) return res.cc('用户不存在！')
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult) return res.cc('旧密码错误')

        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        db.query(sql,[newPwd,req.user.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功！',0)
        })
    })
}
// 更新用户头像的处理函数
exports.updateAvatar = (req,res)=>{
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr,[req.body.avatar,req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户头像失败！')
        res.cc('更新用户头像成功',0)
    })
}
// 获取用户列表的处理函数
exports.getUserList = (req,res)=>{
    const sqlStr = 'select * from ev_users'
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(err)
        res.send({
            status:0,
            message:'获取用户列表成功！',
            data:results
        })
    })
}

// 获取用户收藏的处理函数
exports.getCollectList = (req,res)=>{
    const sqlStr = 'select * from ev_users where id=?'
    db.query(sqlStr,req.query.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户收藏失败！')
        res.send({
            status:0,
            message:'获取用户收藏成功！',
            collected:results[0].collected
        })
    })
}
// 更新用户收藏的处理函数
exports.updateCollect = (req,res)=>{
    console.log(req.body)
    const sqlStr = 'update ev_users set collected=? where id=?'
    db.query(sqlStr,[req.body.collect,req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户收藏失败！')
        res.cc('更新用户收藏成功',0)
    })
}