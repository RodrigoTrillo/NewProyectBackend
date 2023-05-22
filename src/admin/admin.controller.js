const {Router}=require('express')
const passport = require('passport')


const router = Router()

router.get('/private',passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.json({message: 'This is Privated'})
})

module.exports= router