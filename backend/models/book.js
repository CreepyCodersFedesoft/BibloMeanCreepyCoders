const mongoose = require("mongoose");
const moment = require("moment");

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  code: { type: String, default: moment().unix() },
  libraryId: { type: mongoose.Schema.ObjectId, ref: 'library'},
  date: { type: Date, default: Date.now() },
  bookStatus: { type: String, default: true}
});

const book = mongoose.model('book', bookSchema);
module.exports = book;