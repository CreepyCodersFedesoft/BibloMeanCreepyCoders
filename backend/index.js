const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
require("dotenv").config();
const Book = require('./routes/book');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/book', Book);

app.listen(
  process.env.PORT,
  console.log(`Server is listen OK on port ${process.env.PORT}`)
);

dbConnection();