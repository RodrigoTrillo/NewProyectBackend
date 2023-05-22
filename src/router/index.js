const productsController = require('../controllers/products.controller')
const usersController = require('../controllers/users.controller')
const mailController = require('../controllers/mail.controller')
const authController= require('../controllers/auth.controller')
const viewsTemplateController = require('../viewsTemplate/viewsTemplate.controller')
const cartController = require('../controllers/cart.controller')

const router = app =>{
    app.use('/',viewsTemplateController)
    app.use('/products', productsController)
    app.use('/users',usersController)
    app.use('/mail',mailController)
    app.use('/auth',authController)
    app.use('/cart',cartController)
}

module.exports = router