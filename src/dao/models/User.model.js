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
    },
    documents: [
        {
          name: String,
          reference: String,
        },
    ],
    last_connection: Date,
})

userSchema.methods.updateLastConnection = function() {
    this.last_connection = new Date();
    return this.save();
  };

const User = mongoose.model(userCollection,userSchema)

module.exports = User