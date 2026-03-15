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