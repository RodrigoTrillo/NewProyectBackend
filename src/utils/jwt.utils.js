const jwt = require('jsonwebtoken')

const SECRET_KEY = 'coderSecret'

const generateToken = (user)=>{
    const token  = jwt.sign({user}, SECRET_KEY,{expiresIn:'60s'})
    return token
}

const authToken = (req,res,next)=>{
    const authHeader = req.headers.autorization
    if(!authHeader) return res.status(401).json({error: 'Not authenticated'})
    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET_KEY,(error,credentials)=>{
        if(error) return res.status(403).json({error:'Not authorized'})
        req.user = credentials.user
        next()
    })
}

const authTokenCookie = (req,res,next)=>{
    const token = req.cookies.authToken
    if(!token) return res.status(401).json({error: 'Not authenticated'})

    jwt.verify(token, SECRET_KEY,(error,credentials)=>{
        if(error) return res.status(403).json({error:'Not authorized'})
        req.user = credentials.user
        next()
})
}

module.exports={
    generateToken,
    authToken,
    authTokenCookie
}