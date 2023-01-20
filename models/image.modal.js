const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
  name: {
    type: String
  },
  file: {
    type: String
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
  hashtag: {
    type: String
  },
}, {
    collection: 'portfolio'
  })
module.exports = mongoose.model('portfolio', studentSchema)