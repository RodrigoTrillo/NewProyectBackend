const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')
const mongoConnect = require('../db')
const router = require('./router')
const passport = require('passport')
const initializePassport = require('./config/passport.config')
const handlebars = require('express-handlebars')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
//const __dirname = require('./utils/cryptPassword')

const app = express()
const port = process.env.PORT||3000

const swaggerOptions ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Documentacion de NewProyect",
            description:"Encontratas los metodos necesarios para trabajar con la api"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(morgan('dev'))
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://RodrigoTrillo:Rolly1560@clustercoder.gkuf5cv.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser: true,useUnifiedTopology:true}
    }) ,
    secret:'asdasdasd12312',
    resave:false,
    saveUninitialized:false,
}))

const specs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')


router(app)
mongoConnect()

app.listen(port ,()=>{
    console.log(`server runnin at port ${port}`)
})