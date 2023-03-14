// 注册数据库操作模块
const db = require('../db/index')
exports.addBanner = (req,res)=>{
    const banners = req.body
    console.log(req);
    /* if(!userinfo.username || !userinfo.password){
        res.cc('用户名或密码不合法！')
    } */
    // 定义sql语句,查询用户名是否被占用
    const sqlStr = 'insert into ev_banner set ?'
    db.query(sqlStr,{targetId:banners.targetId,targetType:banners.targetType,typeTitle:banners.typeTitle,url:banners.url},(err,results)=>{
        res.send('banner ok')
        if(err) return res.cc(err)
        if (results.affectedRows !==1 )  return res.cc('添加失败,请稍后再试!')
        // 添加成功
        res.cc('添加成功！',0)
    })
}
