const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    // username: String,       //automatically done by passsport-local-mongoose
    // password: String,       //automatically done by passsport-local-mongoose
    email: String,
    cart: [{
        name: String,
        price: Number,
        img: String,
        id: mongoose.Schema.Types.ObjectId,
        count: {
            type: Number,
            default: 1,
            min: [0, 'quantity cannot be less than 1']
        }
    }]
})

UserSchema.plugin(passportLocalMongoose)    //transfers control to passportlocalmongoose

const User = mongoose.model('User', UserSchema)
module.exports = User