const db = require("../db/index")

exports.getStations = (req,res)=>{
    const sqlStr = `select * from ev_stations order by id asc`
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(err)
        res.send({
            status:0,
            message:'获取电台数据成功',
            data:results
        })
    })
}
exports.addStations = (req,res)=>{
    const sql = 'select * from ev_stations where id=?'
    db.query(sql,[req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.length == 1) return res.cc('id被占用，请更换后重试！')
        const sqlStr = `insert into ev_stations set ?`
        db.query(sqlStr,[req.body],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('新增电台失败！')
            res.send({
                status:0,
                message:'新增电台成功！',
            })
        })
    })
}
exports.deleteStationById = (req,res)=>{
    const sqlStr = 'delete from ev_stations where id = ?'
    db.query(sqlStr,[req.query.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除电台失败！')
        res.cc('删除电台成功！',0)
    })
}
exports.updateStationById = (req,res)=>{
    const sqlStr = 'select * from ev_stations where id=?'
    db.query(sqlStr,[req.body.id],(err,results)=>{
        if(err) res.cc(err)
        const sql = 'update ev_stations set ? where id=?'
        db.query(sql,[req.body,req.body.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新电台数据失败！')
            res.send({
                status:0,
                message:'更新电台数据成功！',
            })
        })
    })
}
// 获取电台基本信息的处理函数
exports.getStationInfo = (req,res)=>{
    const sqlStr = 'select * from ev_stations where id=?'
    db.query(sqlStr,req.query.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取电台信息失败！')
        res.send({
            status:0,
            message:'获取电台信息成功！',
            profile:results
        })
    })
}