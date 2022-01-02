const controller = require('../controllers/homeController')
const express = require('express')
const router = express.Router()
const upload = require("../middlewares/avatarUpdate")

router.get('/', controller.index)
router.get('/users', controller.useres)

router.get('/register', controller.register)
router.get('/login', controller.login)
router.get('/users/edit/:id', controller.look)

router.put('/users/edit/:id',upload.single('imagen'), controller.edit)

router.post('/register', upload.single('imagen'), controller.create)

module.exports = router
