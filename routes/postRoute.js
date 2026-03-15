const { Router } = require('express')
const { isAuth } = require('../middlewares/authMiddleware')
const postController = require('../controllers/postController')

const router = Router()


router.get('/create-post', isAuth, postController.createView)
router.post('/create-post', isAuth, postController.create)

module.exports = router