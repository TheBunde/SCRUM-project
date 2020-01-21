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
            //text: "Hei "+json.name+"! Du har nylig opprettet en bruker på Harmoni!"
            html: "<h3>Hei "+json.name+"!</h3>"+
                "<p>Velkommen som bruker på Harmoni.</p>"+
                "<p>Sammen skal vi skape god harmoni</p>"+
                "<p>&nbsp;</p>"+
                "<p><strong>Mvh</strong></p>"+
                "<p>Harmoni</p>"+
                "<p> - skap Harmoni.</p>"
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
            //text: "Hei "+json.name+"! Du har nylig tilbakestilt ditt passord på Harmoni. Ditt nye passord er: "+newPass
            html: "<h3>Hei "+json.name+"!</h3>"+
                "<p>Du har nylig bedt om å få tilbakestilt ditt passord.</p>"+
                "<p>Ditt nye passord er nå: <strong>"+newPass+"</strong></p>"+
                "<p>Logg inn på Harmoni for å endre ditt passord.</p>"+
                "<p>&nbsp;</p>"+
                "<p><strong>Mvh</strong></p>"+
                "<p>Harmoni</p>"
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
