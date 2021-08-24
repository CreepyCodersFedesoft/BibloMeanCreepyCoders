const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get("/listUser", UserController.listUser);

module.exports = router;
