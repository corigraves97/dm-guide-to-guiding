const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

module.exports = router

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.get('/login', (req, res) =>{
    res.render('auth/login.ejs')
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.post('/signup', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username})
    if (userInDatabase){
        return res.send('Username taken.')
    }
    if (req.body.password !== req.body.confirmPassword){
        return res.send(`Password and Confirm Password must match`)
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.send(`Welcome to The DM'S GUIDE TO GUIDING, ${user.username}`)
})

router.post('/login', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username})
    if (!userInDatabase) {
        return res.send('Login failed. Please try agan.')
    }
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    )
    if (!validPassword) {
        return res.send('Login failed. Please try again.')
    }
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    }
    res.redirect('/')
})