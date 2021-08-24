const Library = require("../models/library");
const moongose = require("mongoose");

const registerLibrary = async (req, res) => {
  if (!req.body.library || !req.body.address || req.body.roleId)
    return res.status(400).send("Incomplete library data");

  let existingLibrary = await Library.findOne({ library: req.body.library });
  if (existingLibrary)
    return res.status(400).send("The Lbrary already registered");

  let library = new Library({
    roleId: req.role._id,
    library: req.body.library,
    address: req.body.address,
    LibraryStatus: true,
  });
  let result = await library.save();
  if (!result) return res.status(400).sed("Failed to register Library");
  return res.status(200).send({ result });
};

const listLibrary = async (req, res) => {
  let library = await Library.find();
  if (!library || library.length === 0)
    return res.status(400).send("There is not library list");
  return res.status(200).send({ library });
};

const updateLibrary = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.library)
    return res.status(400).send("Incomplete library data");

  let library = await Library.findByIdAndUpdate(req.body._id, {
    address: req.body.address,
  });
  if (!library) return res.status(400).send("Error editing library");
  return res.status(200).send({ library });
};

const deleteLibrary = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let library = await Library.findByIdAndDelete(req.params._id);
  if (!library) return res.status(400).send("Library not found");
  return res.status(200).send("Library deleted");
};

module.exports = { registerLibrary, listLibrary, updateLibrary, deleteLibrary };
