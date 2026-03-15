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

module.exports = {
    registerView,
    loginView,
    home,
    account
}