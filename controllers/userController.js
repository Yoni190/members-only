const db = require('../db/queries')
require('dotenv').config()

function registerView(req, res) {
    res.render('sign-up')
}

function loginView(req, res) {
    res.render('login')
}

async function home(req, res) {
    const posts = await db.getPosts()

    res.render('home', {
        posts
    })
}

function account(req, res) {
    res.render('account', {
        user: req.user
    })
}

function activateView(req, res) {
    res.render('membership')
}

async function activate(req, res) {
    const { code } = req.body

    if(code !== process.env.MEMBERSHIP_CODE) {
        return res.redirect('/activate-membership')
    }

    await db.activate(req.session.passport.user)

    res.redirect('/account')
}

module.exports = {
    registerView,
    loginView,
    home,
    account,
    activateView,
    activate
}