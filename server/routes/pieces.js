const express = require("express");
const router = express.Router();
const piecesController = require("../controllers/pieces-controller");
const fs = require("fs");

router.route('/')
    .get(piecesController.getEntries)

router.route("/:id")
    .get(piecesController.getEntry)

module.exports = router