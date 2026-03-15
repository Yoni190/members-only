const { Pool } = require('pg')
const { connectionString } = require('pg/lib/defaults')
require('dotenv').config()

// module.exports = new Pool({
//     host: process.env.HOST,
//     user: process.env.ROLENAME,
//     database: process.env.DBNAME,
//     password: process.env.ROLEPASSWORD,
//     port: process.env.DBPORT
// })

module.exports = new Pool({
    connectionString: `postgresql://${process.env.ROLENAME}:${process.env.ROLEPASSWORD}@${process.env.HOST}/${process.env.DBNAME}?sslmode=${process.env.PGSSLMODE}&channel_binding=${process.env.PGCHANNELBINDING}`
})