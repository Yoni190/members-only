const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { isAuth } = require('./authMiddleware')
const passport = require('passport')


router.post('/register', authController.register)
router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/protected',
        failureRedirect: '/login'
    })
)




module.exports = router