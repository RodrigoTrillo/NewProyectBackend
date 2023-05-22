const nodemailer = require('nodemailer')
const { emailUser, emailPassword, serviceMail, serviceMailPort } = require('../config/gmail.config')

const transport = nodemailer.createTransport({
    service: serviceMail,
    port: serviceMailPort,
    auth:{
        user:emailUser,
        pass:emailPassword
    }
})


const sendMail = async(to,subject,message)=>{
    const html=`
    <h2 style="font-size: 16px; text-aling: center;">
        ${message}
    </h2>
    `

    const mailOptions = {
        from: emailUser,
        to,
        subject,
        html,
        attachmetn:[]
    }

    return await transport.sendMail(mailOptions)


}


module.exports = {transport, sendMail}