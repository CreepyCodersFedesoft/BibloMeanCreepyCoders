const Book = require("../models/book");
const Library = require("../models/library")

const registerBook = async (req, res) => {
  if(!req.body.name || !req.body.author )//|| !req.body.libraryId
    return res.status(400).send("Error: There'r empty fields");

  //validar que la biblioteca exista
  let existingLibrary = await Library.findById({_id: req.body.libraryId});
  if(!existingLibrary) return res.status(400).send("Error: Library doesn't exist");

  let book = new Book({
    name: req.body.name,
    author: req.body.author,
    libraryId: req.body.libraryId,
  });

  let result = await book.save();
  if(!result) return res.status(400).send("Error: Error to save data");
  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  let book = await Book.find({ name: new RegExp(req.params["name"], "i")}).populate('libraryId').exec();
  if(!book || book.length === 0) return res.status(400).send("Error: book  doesn't exist");
  return res.status(200).send({ book });
};
//update podrá modificar la biblioteca a la que pertenece el libro
const updateBook = async (req, res) => {};
//delete cambia el status de un libro a false
const deleteBook = async (req, res) => {};

module.exports = { registerBook, listBook, updateBook, deleteBook };
