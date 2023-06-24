const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require("method-override")
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')

// using all routers
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRouter')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const app = express()

const sessionConfig = {
    secret: 'weneedgoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000
    }
}

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.authenticate('session'))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user
    next()
})

// using product routes
app.use(productRoutes)
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)

app.get('/', (req,res)=>{
    res.render('homepage')
})

app.listen('3000', (req,res)=>{
    console.log('server started at http://localhost:3000')
})