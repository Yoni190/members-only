const express = require('express')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const adminRoute = require('./routes/adminRoute')

const path = require('node:path')
const session = require('express-session')
const passport = require('passport')
const pool = require('./db/pool')

const pgStore = require('connect-pg-simple')(session)

const passportConfig = require('./config/passport')


require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new pgStore({ pool, tableName: 'sessions', createTableIfMissing: true })
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
)
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(authRoute)
app.use(userRoute)
app.use(postRoute)
app.use(adminRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) {
        throw error
    }

    console.log(`Server listening on port ${PORT}`)
})