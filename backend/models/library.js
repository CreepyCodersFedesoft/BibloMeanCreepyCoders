const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  library: String,
  address: String,
  date: { type: Date, default: Date.now },
  LibraryStatus: Boolean,
});

const library = mongoose.model("library", librarySchema);
module.exports = library;
