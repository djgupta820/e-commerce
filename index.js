const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require("method-override")

// using all routers
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRouter')

const app = express()

const sessionConfig = {
    secret: 'weneedgoodsecret',
    resave: false,
    saveUninitialized: true
}

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sessionConfig))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// using product routes
app.use(productRoutes)
app.use(reviewRoutes)

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen('3000', (req,res)=>{
    console.log('server started at http://localhost:3000')
})