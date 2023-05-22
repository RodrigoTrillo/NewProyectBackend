const mongoose = require('mongoose')
const { stringify } = require('uuid')

const userCollection ='user'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email:{
        type:String,
        unique:true,
    },
    password: String,
    role:{
        type:String,
        require:true
    }
})

const User = mongoose.model(userCollection,userSchema)

module.exports = User