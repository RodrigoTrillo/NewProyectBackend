const cartModel = require("./models/Cart.model");

class CartDao {
    constructor(){
        console.log('CartDao Start')
    };

    getProducts = async ()=>{
        let carts = await cartModel.find()
        return carts.map((cart)=> cart.toObject()) 
    };

    async getProducts (){
        try {
            let carts = await cartModel.find()
            return carts.map((cart)=> cart.toObject()) 
        } catch (error) {
            throw error
        }
    }

    async getById(id){
        try {
            let cart = await cartModel.findOne({_id: id})
            return cart
        } catch (error) {
            throw error
        }
    }

   

    async addProductToCart(cartId, productId){
        try {
            let cart = await cartModel.findOne({_id:id})
            result = res.status(200).json('Product add to cart')
            return result
        } catch (error) {
            throw error
        }
    }
    

    async create(cart){
        try {
            let result = await cartModel.create(cart)
            return result
        } catch (error) {
            throw error
        }
    }

    async update(id, cart){
        try {
            let result = await cartModel.updateOne({_id: id}, cart)
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(id){
        try {
            let result = await cartModel.deleteOne({_id: id})
            return result
        } catch (error) {
            throw error
        }
    }

}

module.exports = CartDao