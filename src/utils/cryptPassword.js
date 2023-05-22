const bcrypt = require('bcrypt')
const {dirname} = require('path')

const createHash = password =>{
    const salt = bcrypt.genSaltSync(10)
    const passEncrypted = bcrypt.hashSync(password, salt)
    return passEncrypted()
}

const isValidPassword = (user, password)=>{
    const response = bcrypt.compareSync(password,user.password)

    return response
}


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(dirname(__filename))

module.exports={
    createHash,
    isValidPassword,
    __dirname
}