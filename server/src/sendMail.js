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

    sendResetPasswordMail(json, newPass) {
        console.log("Sending reset password mail to: "+json.email+". New password for "+json.name+" is: "+newPass);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "noreply.harmoni@gmail.com",
                pass: "DoingDonn"
            }
        });
        
        const mailOptions = {
            from: '"Harmoni passord resett" <noreply.harmoni@gmail.com>',
            to: json.email,
            subject: 'Tilbakestilling av passord Harmoni',
            text: "Hei "+json.name+"! Du har nylig tilbakestilt ditt passord på Harmoni. Ditt nye passord er: "+newPass
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Password resett sent: ' + info.response);
            }
        });
    }
}
