function registerView(req, res) {
    res.render('sign-up')
}

function loginView(req, res) {
    res.render('login')
}

module.exports = {
    registerView,
    loginView
}