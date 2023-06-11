const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const methodOverride = require("method-override")

// using all routers
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRouter')

const app = express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// using product routes
app.use(productRoutes)
app.use(reviewRoutes)

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen('3000', (req,res)=>{
    console.log('server started at http://localhost:3000')
})