const pool = require('./pool')


async function register(f_name, l_name, username, password) {
    try {

        
        await pool.query('INSERT INTO users (f_name, l_name, username, password, membership) VALUES ($1, $2, $3, $4, $5)', [f_name, l_name, username, password, false])
    } catch (error) {
        console.error(error)
    }
}

async function checkUsername(username) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        return rows
    } catch (error) {
        console.error(error)
    }
}


async function activate(id) {
    try {
        await pool.query('UPDATE users SET membership = TRUE WHERE id = $1', [id])
    } catch (error) {
        console.error(error)
    }
}

async function getPosts() {
    try {
        const { rows } = await pool.query('SELECT posts.id, title, message, timestamp, f_name, l_name FROM posts INNER JOIN users ON posts.user_id = users.id')
        return rows
    } catch (error) {
        console.error(error)
    }
}

async function createPost(title, message, user_id) {
    try {
        await pool.query('INSERT INTO posts (title, message, timestamp, user_id) VALUES ($1, $2, $3, $4)', [title, message, 'NOW()', user_id])
    } catch (error) {
        console.error(error)
    }
}

async function setAdminStatus(id) {
    try {
        await pool.query('UPDATE users SET admin = TRUE WHERE id = $1', [id])
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    register,
    checkUsername,
    activate,
    getPosts,
    createPost,
    setAdminStatus
}