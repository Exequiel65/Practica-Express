const controller = require('../controllers/adminController')
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/fileProducts')
const userCheck = require('../middlewares/adminFix')

router.get('/', userCheck,controller.index)
router.post('/',upload.single('imagen'), controller.newProduct)
router.get('/editer/:id', userCheck,controller.edit)
router.put('/editer/:id',upload.single('imagen'), controller.update)



module.exports = router