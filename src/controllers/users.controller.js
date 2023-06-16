const {Router} = require('express')
const passport = require('passport')
const User = require('../dao/models/User.model')
const { createHash } = require('../utils/cryptPassword')

const router = Router()

router.post('/premium/:uid', (req, res) => {
    const uid = req.params.uid;
  
    res.send('Premium user');
})

router.post('/',passport.authenticate('register',{failureRedirect:'/failRegister'}),async(req,res)=>{
    try {
        res.json({message: 'Registered User'})
    } catch (error) {
        if(error.code === 11000)
            return res.status(400).json({error:'User already exists'})
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.post('/:uid/documents', upload.array('documents'), (req,res)=>{
    const uid = req.params.uid;
    const uploadedFiles = req.files;

    // Verificar si los documentos requeridos están presentes
    const requiredDocuments = ['name', 'reference'];
    const uploadedDocuments = uploadedFiles.map(file => file.fieldname);
    const hasRequiredDocuments = requiredDocuments.every(document => uploadedDocuments.includes(document));

    if (hasRequiredDocuments) {
        // Lógica para actualizar el usuario a premium
        // ...
        res.json({message: 'Usuario actualizado a premium'});
      } else {
        // Lógica si no se cargaron los documentos requeridos
        // ...
        res.status(400).json({message:'Falta cargar documentos requeridos'});
      }

})

router.get('/failRegister', async(req,res)=>{
    console.log('Register Fail')
    res.json({error:'Fail'})
})

module.exports = router