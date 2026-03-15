const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const passport = require('passport')


router.post('/register', authController.register)
router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

router.get('/log-out', authController.logout)




module.exports = router