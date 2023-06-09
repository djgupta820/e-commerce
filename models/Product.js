const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

const ProductSchema = new mongoose.Schema({
    name : String,
    price : Number,
    img : String,
    desc : String
})

const Product = new mongoose.model('Product', ProductSchema)
module.exports = Product