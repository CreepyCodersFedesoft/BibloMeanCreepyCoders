const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/library");

router.post("/registerLibrary", LibraryController.registerLibrary);

router.get("/listLibrary", LibraryController.listLibrary);

router.put("/updateLibrary", LibraryController.updateLibrary);

router.delete("/deleteLibrary", LibraryController.deleteLibrary);

module.exports = router;
