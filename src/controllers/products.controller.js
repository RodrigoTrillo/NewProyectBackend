const {Router, response} = require('express')
const Product = require('../dao/models/Products.model')
const ProductDao = require('../dao/Products.dao')

const router = Router()

 // obtiene todos los productos 
router.get = ('/', async(req, res, next)=>{
    try {
        const products =await Products.getAll()
        res.status(200).json({message: products}) 
    } catch(error){
        
        
    }
})


 //obtener un producto por su ID
router.get('/:id', async(req,res)=>{
    const productId = req.params.id
    try {
        const product = await Product.getById()
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }else{
            res.status(200).json({message: product})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

 // Crea un nuevo Producto
router.post('/', async(req,res)=>{
    try {
        const {name, description, price, category, image, stock} = req.body
        const productInfo ={
            name,
            description,
            price,
            category,
            image,
            stock
        }
        const Products = new ProductDao('products.json')
        const newProduct = await Product.create(productInfo)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//Actualizar un productoExistente

router.put('/:id',async(req,res)=>{
    const productId = req.params.id
    const {name, description, price, category, image, stock} = req.body
    const productDto = new ProductDto(name, description, price, category, image, stock)
    try {
        const updateProduct = await Product.update(productId, productDto)
        if(!updateProduct){
            res.status(404).json({message:'Product not found'})
        }else{
            res.status(200).json(updateProduct)
        }       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async(req,res)=>{
    const productId = req.params.id
    try {
        const deleteProduct = await Product.delete(productId)
        if (!deleteProduct) {
            res.status(404).json({message: 'Product not found'})
        } else {
            res.status(200).json(deleteProduct)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router