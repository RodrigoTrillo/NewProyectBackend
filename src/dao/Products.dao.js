const Product = require("./models/Products.model");

class ProductDao{
    constructor(){}

    async getAll(){
        try {
            return await Product.find()
        } catch (error) {
            throw error
        }
    }

    async getById(id){
        try {
            return await Product.findById(id)
        } catch (error) {
            throw error
        }
    }

    async create(productInfo){
        try {
            return await Product.create(productInfo)
        } catch (error) {
            throw error
        }
    }

    async update(id, productUpdate){
        try {
            return await Product.updateOne({_id:id},{$set: productUpdate})
        } catch (error) {
            throw error
        }
    }

    async delete(id){
        try {
            return await Product.deleteOne({_id: id})
        } catch (error) {
            throw error
        }
    }

}

module.exports = ProductDao