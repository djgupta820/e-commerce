const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Product = require('../models/Product')
const {isLoggedIn} = require('../middleware')

router.post('/products/:productId/review', isLoggedIn, async (req,res)=>{
    const {productId} = req.params
    const {rating, comment} = req.body

    // find the product with given id
    const product = await Product.findById(productId)
    const review = await Review.create({rating, comment})
    product.reviews.push(review)
    await product.save()
    res.redirect(`/products/${productId}`)
})

module.exports = router