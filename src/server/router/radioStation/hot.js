// 导入 express 模块
const express = require('express')
const router = express.Router()
// 导入热门电台的路由处理函数模块
const stationcate_handler = require('../../router_handler/stationcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema} = require('../../schema/stationcate')


/* // 获取热门电台列表数据的路由
router.get('/hotRadios',stationcate_handler.getStationCates)
// 新增热门电台的路由
router.post('/addhotRadios',expressJoi(add_cate_schema),stationcate_handler.addStationCates)
// 删除热门电台的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema),stationcate_handler.deleteCateById)
// 根据 Id 获取热门电台数据的路由
router.get('/cates/:id',expressJoi(get_cate_schema),stationcate_handler.getArtCateById)
// 根据 Id 更新热门电台数据的路由
router.post('/updatecate',expressJoi(update_cate_schema),stationcate_handler.updateCateById) */


// 获取电台分类列表数据的路由
router.get('/cates',stationcate_handler.getStationCates)
// 新增电台分类的路由
router.post('/addcates',expressJoi(add_cate_schema),stationcate_handler.addStationCates)
// 删除电台分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema),stationcate_handler.deleteCateById)
// 根据 Id 获取电台分类数据的路由
router.get('/cates/:id',expressJoi(get_cate_schema),stationcate_handler.getArtCateById)
// 根据 Id 更新电台分类数据的路由
router.post('/updatecate',expressJoi(update_cate_schema),stationcate_handler.updateCateById)


module.exports = router