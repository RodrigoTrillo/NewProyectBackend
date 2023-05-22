class ProductDto{
    constructor(id,name, description, price, category, image, stock){
        this.id= id
        this.name = name
        this.description = description
        this.price = price
        this.category = category 
        this.image = image
        this.stock = stock
    }
}

module.exports = ProductDto