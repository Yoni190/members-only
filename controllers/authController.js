const db = require('../db/queries')
const bcrypt = require('bcrypt')
const { body, validationResult, matchedData } = require('express-validator')


const validate = [
    body('f_name').trim()
        .isEmpty().withMessage('Please enter your first name'),
    body('l_name').trim()
        .isEmpty().withMessage('Please enter your last name'),
    body('username').trim()
        .isEmpty().withMessage('Please enter a username'), 
    body('password').trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    body('confirm_password').custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Password and Confirm password must be the same'),
    body('username').custom((async value => {
        const user = await db.checkUsername(value)
        console.log(user.length > 0)
        if(user.length > 0) {
            throw new Error('Username already registered!')
        }
    }))
]

exports.register = [
    validate,
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).render('sign-up', {
                errors: errors.array()
            })
        }

        const { f_name, l_name, username, password } = matchedData(req)


        const hashedPassword = await bcrypt.hash(password, 10)

        await db.register(f_name, l_name, username, hashedPassword)

        res.status(200).json({ message: 'User registered successfully.' })
    }
]
