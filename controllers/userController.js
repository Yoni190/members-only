const db = require('../db/queries')
require('dotenv').config()

function registerView(req, res) {
    res.render('sign-up')
}

function loginView(req, res) {
    res.render('login')
}

function home(req, res) {
    res.render('home')
}

function account(req, res) {
    res.render('account', {
        user: req.user
    })
}

function activateView(req, res) {
    res.render('membership', {
        id: req.session.passport.user
    })
}

async function activate(req, res) {
    const { code, id } = req.body

    if(code !== process.env.MEMBERSHIP_CODE) {
        return res.redirect('/activate-membership')
    }

    await db.activate(id)

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