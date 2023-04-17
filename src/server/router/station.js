const express = require('express')
const router = express.Router()

const station_handler = require('../router_handler/station')


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {add_station_schema,delete_station_schema,update_station_schema} = require('../schema/station')

// 获取电台列表数据的路由
router.get('/getStations',station_handler.getStations)
// 新增电台的路由
router.post('/addStation',expressJoi(add_station_schema),station_handler.addStations)
// 删除电台的路由
router.get('/deletestation',station_handler.deleteStationById)
// 根据 Id 更新电台数据的路由
router.post('/updatestation',expressJoi(update_station_schema),station_handler.updateStationById)
// 根据 Id 获取电台数据的路由
// router.get('/stations/:id',expressJoi(get_station_schema),station_handler.getArtCateById)
// 获取电台信息
router.get('/userinfo',station_handler.getStationInfo)



module.exports = router