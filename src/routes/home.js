const controller = require('../controllers/homeController')
const express = require('express')
const router = express.Router()

router.get('/', controller.index)

module.exports = router
