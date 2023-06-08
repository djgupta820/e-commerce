const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const methodOverride = require("method-override")

const productRoutes = require('./routes/productRoutes')

const app = express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// using product routes
app.use(productRoutes)

app.get('/', (req,res)=>{
    res.send("<h1> E-Commerce Website </h1>")
})

app.listen('3000', (req,res)=>{
    console.log('server started at http://localhost:3000')
})