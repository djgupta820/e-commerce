const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String
})

const Review = new mongoose.model('Review', ReviewSchema)
module.exports = Review