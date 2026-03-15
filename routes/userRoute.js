const { Router } = require('express')
const userController = require('../controllers/userController')
const { isAuth } = require('../middlewares/authMiddleware')

const router = Router()

router.get('/register', userController.registerView)
router.get('/login', userController.loginView)
router.get('/', userController.home)

router.get('/account', isAuth, userController.account)
router.get('/activate-membership', isAuth, userController.activateView)
router.post('/activate-membership', isAuth, userController.activate)




module.exports = router