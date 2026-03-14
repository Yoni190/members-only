const pool = require('./pool')


async function register(f_name, l_name, username, password) {
    try {
        await pool.query('INSERT INTO users (f_name, l_name, username, password, membership) VALUES ($1, $2, $3, $4, $5)', [f_name, l_name, username, password, false])
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    register
}