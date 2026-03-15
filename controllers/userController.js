const db = require('../db/queries')
require('dotenv').config()
const { body, validationResult, matchedData } = require('express-validator')


const validateCode = [
    body('code').trim()
        .notEmpty().withMessage('Please enter the membership code.')
]

exports.registerView = [
    (req, res) => {
        res.render('sign-up', {
            title: 'Sign Up'
        })
    }
]
exports.loginView = [
    (req, res) => {
        res.render('login', {
            title: 'Login'
        })
    }
]

exports.home = [
    async (req, res) => {
        const posts = await db.getPosts()

        const isMember = req.user?.membership || false
        const isAdmin = req.user?.admin || false


        res.render('home', {
            posts,
            isMember,
            isAdmin,
            title: 'Home'
        })
    }
]

exports.account = [
    (req, res) => {
        res.render('account', {
            user: req.user,
            title: 'Account'
        })
    }
]

exports.activateView = [
    (req, res) => {
        res.render('membership', {
            title: 'Membership'
        })
    }
]

exports.activate = [
    validateCode,
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).render('membership' ,{
                errors: errors.array()
            })
        }

        const { code } = matchedData(req)

        if(code !== process.env.MEMBERSHIP_CODE) {
            return res.redirect('/activate-membership')
        }

        await db.activate(req.session.passport.user)

        res.redirect('/account')
    }
]