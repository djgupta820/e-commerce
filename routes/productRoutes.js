const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// get all products
router.get('/products', async (req,res)=>{
    const products = await Product.find({}) 
    res.render('products/index', {products})
})

// get form to create new product
router.get('/products/new', (req,res)=>{
    res.render('products/new')
})

// create new product
router.post('/products/new', async (req,res)=>{
    const {name, img, price, desc} = req.body
    await Product.create({name, img, price, desc})
    res.redirect('/products')
})

// show product
router.get('/products/:productId', async (req,res)=>{
    const {productId} = req.params
    const product = await Product.findById(productId)
    res.render('products/show', {product})
})

// render edit/update product
router.get('/products/:productId/edit', async (req,res)=>{
    const {productId} = req.params
    const product = await Product.findById(productId)
    res.render('products/edit', {product})
})

// update the product
router.patch('/products/:productId', async (req,res)=>{
    const {productId} = req.params
    const {name, img, price, desc} = req.body
    await Product.findByIdAndUpdate(productId, {name, img, price, desc})
    res.redirect('/products')
})

// delete product
router.delete('/products/:productId', async (req,res)=>{
    const {productId} = req.params
    await Product.findByIdAndDelete(productId)
    res.redirect('/products')
})

module.exports = router