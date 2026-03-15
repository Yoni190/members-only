const { Router } = require('express')
const { isAuth } = require('../middlewares/authMiddleware')
const postController = require('../controllers/postController')

const router = Router()


router.get('/create-post', isAuth, postController.createView)

module.exports = router