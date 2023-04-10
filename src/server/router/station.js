const express = require('express')
const router = express.Router()

const station_handler = require('../router_handler/station')

router.post('/add',station_handler.addStation)

module.exports = router