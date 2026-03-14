const pool = require('./pool')
const bcrypt = require('bcrypt')


async function register(f_name, l_name, username, password) {
    try {
        const hashedPassword = bcrypt.hash(password, 10)

        await pool.query('INSERT INTO users (f_name, l_name, username, password, membership) VALUES ($1, $2, $3, $4, $5)', [f_name, l_name, username, hashedPassword, false])
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    register
}