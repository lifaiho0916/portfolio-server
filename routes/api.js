let express = require('express');
const route = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'youremail@gmail.com',
        pass: 'xxxxxxxxxx',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});



route.post('/sendMail', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'youremail@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});