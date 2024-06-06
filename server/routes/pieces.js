const express = require("express");
const router = express.Router();
const piecesController = require("../controllers/pieces-controller");
const fs = require("fs");

router.route('/')
    .get(piecesController.getEntries)
    .post(piecesController.addPieceEntry)

router.route("/:id")
    .get(piecesController.getEntry)
    .patch(piecesController.editPieceEntry)
    .delete(piecesController.deletePieceEntry)

module.exports = router