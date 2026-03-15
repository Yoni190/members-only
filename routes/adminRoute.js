const { Router } = require('express')
const adminController = require('../controllers/adminController')
const { isAuth } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/admin', adminController.adminView)


module.exports = router