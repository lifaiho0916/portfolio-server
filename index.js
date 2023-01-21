let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// Express Route
const imageRoute = require('./routes/image')
const createError = require('http-errors');

// Connecting mongoDB Database
mongoose
  .connect('mongodb://127.0.0.1:27017/portfolio')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/images', imageRoute)

app.use('/images', express.static('images'));
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });



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



app.post('/api/sendmail', (req, res) => {
    const {name,email, textarea } = req.body;
    const mailData = {
        from: 'youremail@gmail.com',
        to: email,
        subject: name,
        text: textarea,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    // console.log(req);
    // res.status(200).send({ message: "Mail send", message_id: "Success"});
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});