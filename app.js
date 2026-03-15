const express = require('express')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const path = require('node:path')
const session = require('express-session')
const passport = require('passport')

const passportConfig = require('./config/passport')


require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRoute)
app.use(userRoute)

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login'
    })
)

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if(error) {
        throw error
    }

    console.log(`Server listening on port ${PORT}`)
})