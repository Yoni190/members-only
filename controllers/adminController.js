const db = require('../db/queries')
const { body, validationResult, matchedData } = require('express-validator')

const validateAdminCode = [
    body('code').trim()
        .notEmpty().withMessage('Please enter admin code')
]

exports.adminView = [
    (req, res) => {
        res.render('admin')
    }
]

exports.setAdmin = [
    validateAdminCode,
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).render('admin', {
                errors: errors.array()
            })
        }

        const { code } = matchedData(req)

        if(code !== process.env.ADMIN_CODE) {
            return res.status(400).render('admin', {
                errors: [{ msg: 'Wrong Code' }]
            })
        }

        const user_id = req.user.id
        await db.setAdminStatus(user_id)

        res.redirect('/account')
    }
]

exports.deletePost = [
    async (req, res) => {
        const post_id = req.params.id
        
        await db.deletePost(post_id)

        res.redirect('/')
    }
]