const mongoose = require('mongoose')

const productCollection = 'product'

const productSchema = new mongoose.Schema({   
    name:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    category:{
        type:String,
        require:true
    },
    image:[{
        type:String
    }],
    stock:{
        type: Number
    }
})

const Product = mongoose.model(productCollection, productSchema)

module.exports = Product