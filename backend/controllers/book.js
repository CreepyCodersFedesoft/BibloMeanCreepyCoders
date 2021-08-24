const Book = require("../models/book");

const registerBook = async (req, res) => {};
//se podrá filtrar por nombre del libro
const listBook = async (req, res) => {};
//update podrá modificar la biblioteca a la que pertenece el libro
const updateBook = async (req, res) => {};
//delete cambia el status de un libro a false
const deleteBook = async (req, res) => {};

module.exports = { registerBook, listBook, updateBook, deleteBook };
