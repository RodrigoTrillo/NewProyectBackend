const {Router} = require('express')
const transport = require('../utils/mail.utils')
const { emailUser } = require('../config/gmail.config')

const router = Router()

router.get('/',async(req,res)=>{
    try {
        const {to,subject, message} = req.body

        const html = `
        <html>
            <div>
            ${message}
            </div>
        </html>
        `

        const mailOptions = {
            from: emailUser,
            to,
            subject,
            html,
            attachments: []
        }
        const result = await transport.sendMail(mailOptions)
        res.json({message:result})
    } catch (error) {
        res.status(500).json({status: 'error', error: error.message})
    }
})


module.exports = router