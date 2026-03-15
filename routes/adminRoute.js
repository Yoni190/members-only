const { Router } = require('express')
const adminController = require('../controllers/adminController')
const { isAuth } = require('../middlewares/authMiddleware')
const { isAdmin } = require('../middlewares/adminMiddleware')

const router = Router()

router.get('/admin', adminController.adminView)
router.post('/admin', adminController.setAdmin)
router.post('/delete-post/:id', isAuth, isAdmin, adminController.deletePost)

module.exports = router