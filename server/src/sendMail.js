const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


module.exports = class mail{
    sendMail(json) {
        console.log("Sending mail to: "+json.email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "noreply.harmoni@gmail.com",
                pass: "DoingDonn"
            }
        });
        
        const mailOptions = {
            from: '"Harmoni" <noreply.harmoni@gmail.com>',
            to: json.email,
            subject: 'Harmoni',
            text: "Hei "+json.name+"! Du har nylig opprettet en bruker på Harmoni!"
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
