const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const Library = require("../models/role");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.library || !req.body.role)
    return res.status(400).send("Error: Incomplete data.");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send("Error: The user is already registered on the platform.");

  let hash = await bcrypt.hash(req.body.password, 10);

  let role = await Role.findOne({ name: "user" });
  if (!role) return res.status(400).send("Error: No role was assigned.");
  
  let library = await Library.findOne({ name: req.body.library });
  if (!library) return res.status(400).send("Error: No library was assigned.");  

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    libraryId: role._id,
    roleId: library._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error: Failed to register user.");
  try {
    let jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Error: Token generation failed.");
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Error: Wrong email or password.");

  if (!user.dbStatus) return res.status(400).send("Error: Wrong email or password.");

  let hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Error: Wrong email or password.");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Error: Login error.");
  }
};


module.exports = {
  registerUser,
  login
};
