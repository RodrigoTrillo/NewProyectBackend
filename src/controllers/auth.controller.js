const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/User.model')
const { isValidPassword, createHash } = require('../utils/cryptPassword')
const { generateToken } = require('../utils/jwt.utils')
const { sendMail } = require('../utils/mail.utils')

const router = Router()

router.post('/login', (req,res)=>{
  const {email,password} = req.body

  const token = generateToken(email)
  
  res
  .cookie('authToken',token,{maxAge: 6000,httpOnly:true})
  .json({message:'Secion init'})
  
})

router.post('/',passport.authenticate('login',{failureRedirect:'/failLogin'}), async (req, res)=>{
   try {
    if(!req.user) return res.status(400).json({error:'Credenciales invalidad'})

    req.session.user={
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email
    }
    res.json({message:req.user})

   } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
   }
})

router.get('/failLogin',(req,res)=>{
  res.json({error:'No se pudo iniciar sesión'})
})

router.get('/logout', (req, res)=>{
    req.session.destroy(error=>{
        if(error) return res.json({error})
        res.redirect('/login')
    })
})

router.post('/forgotPassword',async (req,res)=>{
    const {email} = req.body
    if(!email) return res.status(400).json({status: 400, ok: false, response: 'Invalid request.'})
    const token = generateToken(email)
    try {
        const aux = await sendMail(
            email,
                "Restore password"
                `
                <div>
                    Link to reset your password <a href="http://localhost:${port}/newpassword/${token}" target="_blank">this link</a> <br/>
                    Remember that you only have 60 min before token expires.<br/>
                    Do not reply this email.
                </div>
                `
        )
        return res.status(200).json({status: 200, ok: false, response: 'Email Sent'})
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/forgotPassword/:token', async(req,res)=>{
    const {token} = req.params
    try {
        if(!authTokenCookie) return res.status(400).json({status:400, ok: false, response: 'Invalid token'})
        res.status(200).json({status:200,ok:true,response: token})
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})


module.exports= router