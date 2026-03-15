const db = require('../db/queries')
const { body, validationResult, matchedData } = require('express-validator')


const validatePost = [
    body('title').trim()
        .notEmpty().withMessage('Please enter post title'),
    body('message').trim()
        .notEmpty().withMessage('Please enter post message')
]

exports.createView = [
    (req, res) => {
        res.render('create-post')
    }
]

exports.create = [
    validatePost,
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).render('create-post', {
                errors: errors.array()
            })
        }

        const { title, message } = matchedData(req)

        const user_id = req.session.passport.user

        await db.createPost(title, message, user_id)
        res.redirect('/home')
    }
]

