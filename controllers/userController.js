function registerView(req, res) {
    res.render('sign-up')
}

function loginView(req, res) {
    res.render('login')
}

function home(req, res) {
    res.render('home')
}

module.exports = {
    registerView,
    loginView,
    home
}