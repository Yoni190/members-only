const db = require('../db/queries')
const bcrypt = require('bcrypt')


async function register(req, res, next) {
    const { f_name, l_name, username, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.register(f_name, l_name, username, hashedPassword)

    res.status(200).json({ message: 'User registered successfully' })
}

module.exports = {
    register
}