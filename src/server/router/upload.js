const express = require('express')
const router = express.Router()
const multer = require('multer');

const upload_handler = require('../router_handler/upload')
const upload = multer({ dest: 'public/uploads/' });
router.post('/add',upload.single('image'),upload_handler.addUpLoad)

module.exports = router