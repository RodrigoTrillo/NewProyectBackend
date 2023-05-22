const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/User.model')
const { createHash } = require('../utils/cryptPassword')

const router = Router()

router.post('/',passport.authenticate('register',{failureRedirect:'/failRegister'}),async(req,res)=>{
    try {
        res.json({message: 'Registered User'})
    } catch (error) {
        if(error.code === 11000)
            return res.status(400).json({error:'User already exists'})
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/failRegister', async(req,res)=>{
    console.log('Register Fail')
    res.json({error:'Fail'})
})

module.exports = router