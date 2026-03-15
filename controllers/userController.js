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

function activate(req, res) {
    res.render('membership', {
        id: req.session.passport.user
    })
}

module.exports = {
    registerView,
    loginView,
    home,
    account,
    activate
}