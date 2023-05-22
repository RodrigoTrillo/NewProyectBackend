const passport = require("passport");
const local = require('passport-local')
const jwt = require('passport-jwt')
const User = require("../dao/models/User.model");
const { createHash, isValidPassword } = require("../utils/cryptPassword");
const cookieExtractor = require("../utils/cookieExtractor");


const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initializePassport=()=>{
    passport.use('register',new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:'email',
        }, async (req, username, password, done)=>{
            const {first_name, last_name,emal,age}=req.body
            try {
                const user = await User.findOne({email: username})
                if(user){
                    console.log({message: 'User already exists'})
                    return done(null, false)
                }
                const newUserInfo ={
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                const newUser = await User.create(newUserInfo)
                return done(null,newUser)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        const user = await User.findOne(id)
        done(null,user)
    })

    passport.use('login', new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try {
            const user = await User.findOne({email: username})
            if(!user){
                console.log('User does not exist')
                return done(null,false)
            }
            if(!isValidPassword(user,password)) return done(null, false)
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))


    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:'coderSecret'
    },async(jwt_payload,done)=>{
        try {
            done(null,jwt_payload)
        } catch (error) {
            done(error)
        }
    }
    ))

}


module.exports= initializePassport