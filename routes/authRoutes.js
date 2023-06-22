const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/register', (req,res)=>{
    res.render('auth/signup')
})

/*router.get('/testUser', async (req,res)=>{
    // create user
    const user = new User({username: 'johndoe123', email: 'johndoe123@gmail.com'})
    // register the created user in db
    const newUser = await User.register(user, 'john123')
    res.send(newUser)
})*/

router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body
    const user = new User({username, email})
    const newUser = await User.register(user, password)
    req.flash('success', 'registration successfull!')
    res.redirect('/login')
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    function(req,res){
        req.flash('success', `welcome back ${req.user.username}`)
        res.redirect('/products')
    }
)

router.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if(err) return next(err)
        req.flash('success', 'logout success')
        res.redirect('/login')
    })
})

module.exports = router