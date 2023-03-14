const express = require('express')
const router = express.Router()

const banner_handler = require('../router_handler/banner')

router.post('/add',banner_handler.addBanner)

module.exports = router