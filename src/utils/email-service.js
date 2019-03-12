'use strict'

const config = require('../config');
const nodemailer = require("nodemailer");

exports.send = async(to, subject, body) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: config.emailAddress,
          pass: config.emailPasswd
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: config.emailAddress, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: ".", // plain text body
        html: body // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}