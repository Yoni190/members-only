const db = require('../db/queries')

function createView(req, res) {
    res.render('create-post')
}

async function create(req, res) {
    const { title, message } = req.body
    const user_id = req.session.passport.user

    await db.createPost(title, message, user_id)
    res.redirect('/home')
}


module.exports = {
    createView,
    create
}