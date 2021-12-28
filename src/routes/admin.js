const controller = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

router.get('/', controller.index)
router.post('/', controller.newProduct)


module.exports = router