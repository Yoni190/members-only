const db = require('../db/queries')

function createView(req, res) {
    res.render('create-post')
}


module.exports = {
    createView
}