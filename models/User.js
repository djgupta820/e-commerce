const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    // username: String,       //automatically done by passsport-local-mongoose
    // password: String,       //automatically done by passsport-local-mongoose
    email: String    
})

UserSchema.plugin(passportLocalMongoose)    //transfers control to passportlocalmongoose

const User = mongoose.model('User', UserSchema)
module.exports = User