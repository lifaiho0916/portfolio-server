let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Student Model
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../models/image.modal');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

router.route('/upload').post(upload.single('pic'), (req, res) => {
  const filename = req.body.filename;
  const pic = req.file.filename;
  const title = req.body.title;
  const hashtag = req.body.hashtag;
  const text = req.body.text;
  console.log(title);
  console.log(hashtag);
  console.log(text);
  const newUserData = {
      'name':filename,
      'file':pic,
      'title': title,
      'hashtag': hashtag,
      'text': text
  }

  const newUser = new User(newUserData);

  newUser.save()
         .then(() => res.json('success'))
         .catch(err => res.status(400).json('Error: ' + err));
});
// READ Students
router.route('/').get((req, res) => {
  console.log("iamges");
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data);
      res.json(data)
    }
  })
})

module.exports = router;