const { Pool } = require('pg')
require('dotenv').config()

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.ROLENAME,
    database: process.env.DBNAME,
    password: process.env.ROLEPASSWORD,
    port: process.env.DBPORT
})