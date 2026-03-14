const db = require('../db/queries')
const bcrypt = require('bcrypt')
const { body, validationResult, matchedData } = require('express-validator')


const validate = [
    body('password').trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    body('confirm_password').custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Password and Confirm password must be the same')
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

        const user = await db.checkUsername(username)
        if(user.length > 0) {
            return res.status(400).json({ message: 'There already exists a user with this username! '})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.register(f_name, l_name, username, hashedPassword)

        res.status(200).json({ message: 'User registered successfully.' })
    }
]

// async function register(req, res, next) {
//     const { f_name, l_name, username, password } = req.body

//     const user = await db.checkUsername(username)
//     if(user.length > 0) {
//         return res.status(400).json({ message: 'There already exists a user with this username! '})
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     await db.register(f_name, l_name, username, hashedPassword)

//     res.status(200).json({ message: 'User registered successfully.' })
// }
