const controller = require('../controllers/homeController')
const express = require('express')
const router = express.Router()

router.get('/', controller.index)
router.get('/users', controller.useres)

router.get('/register', controller.register)

router.post('/register', controller.create)

module.exports = router
