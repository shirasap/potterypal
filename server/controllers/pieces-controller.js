const fs = require('fs');
const path = require('path');
const knex = require("knex")(require("../knexfile"));
const requiredKeys = ["title", "clay_type", "stage", "description", "glaze"];
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

async function getEntries(req, res) {
  try {
    const data = await knex
      .select(
        "pieces.piece_id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        knex.raw("GROUP_CONCAT(images.img_name) as images"),
        knex.raw("GROUP_CONCAT(images.img_id) as img_id")
      )
      .from("pieces")
      .leftJoin("images", "pieces.piece_id", "images.piece_id")
      .groupBy("pieces.piece_id")
      .where("user_id", 1);
    if (!data) {
      return res.status(404);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json(`Error retrieving pieces entries: ${error}`);
  }
}

async function getEntry(req, res) {
  const pieceId = req.params.id;
  try {
    const imageExists = await pieceImageExists(pieceId);

    const data = await knex
      .select(
        "pieces.piece_id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
        knex.raw("GROUP_CONCAT(images.img_name) as images"),
        knex.raw("GROUP_CONCAT(images.img_id) as img_id")
      )
      .from("pieces")
      .leftJoin("images", "pieces.piece_id", "images.piece_id")
      .groupBy("pieces.piece_id")
      .where({ user_id: 1, "pieces.piece_id": pieceId });
    if (!data) {
      return res.status(404);
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    return res.status(500).json(`Error retrieving pieces entries: ${error}`);
  }
}

async function addPieceEntry(req, res) {
  const body = req.body;

  const isValid = requiredKeys.every((field) => body[field]);

  if (!isValid) {
    return res
      .status(400)
      .json("Please make sure to fill in all fields in the request");
  }

  const newPiece = {
    title: body.title,
    clay_type: body.clay_type,
    stage: body.stage,
    description: body.description,
    glaze: body.glaze,
    user_id: body.user_id,
  };

  try {
    const insertedId = await knex("pieces").insert(newPiece).returning("id");

    if (req.file.filename) {
      const pieceImages = {
        img_name: req.file.filename,
        piece_id: insertedId,
      };

      await knex("images").insert(pieceImages);
    }

    res.status(201).json(body);
  } catch (error) {
    res.status(400).json(`Error inserting entry to database: ${error.message}`);
  }
}

async function editPieceEntry(req, res) {
  const pieceId = req.params.id;
  const body = req.body;
  const updatePiece = {
    title: body.title,
    clay_type: body.clay_type,
    stage: body.stage,
    description: body.description,
    glaze: body.glaze,
    user_id: body.user_id,
  };

  const pieceExists = await pieceEntryExists(pieceId);
  if (!pieceExists) {
    return res.status(404).json(`Piece Id ${pieceId} Not Found.`);
  }

 
  if (req.file?.filename) {
    const pieceImages = {
      img_name: req.file.filename,
      piece_id: body.piece_id,
    };

    await knex("images").insert(pieceImages);
  }

  if (body.delimages) {
    const delImage = await knex.select(
      "img_name").from("images").where("img_id", body.delimages)
    await knex("images").where("img_id", body.delimages).del();
    console.log(delImage[0].img_name)
  }

  try {
    await knex
      .select(
        "pieces.piece_id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .join("images", "pieces.piece_id", "images.piece_id")
      .groupBy("pieces.piece_id")
      .where({ user_id: 1, "pieces.piece_id": pieceId })
      .update(updatePiece);

    const data = await knex
      .select(
        "pieces.piece_id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .join("images", "pieces.piece_id", "images.piece_id")
      .groupBy("pieces.piece_id")
      .where("pieces.piece_id", pieceId);
    if (!data) {
      return res.status(404);
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(`Error inserting entry to database: ${error.message}`);
  }
}

async function deletePieceEntry(req, res) {
  const pieceId = req.params.id;

  try {
    const data = await knex("pieces").where("piece_id", pieceId).del();
    if (!data) {
      res.status(404);
    } else {
      res.status(200).json(`${data} entry deleted`);
    }
  } catch (error) {
    res.status(400).json(`Error retrieving inventory: ${error}`);
  }
}

const pieceEntryExists = async (id) => {
  const existingItem = await knex("pieces").where("piece_id", id);
  return !!existingItem.length;
};

const pieceImageExists = async (id) => {
  const existingItem = await knex("images").where("piece_id", id);
  return !!existingItem.length;
};

module.exports = {
  getEntries,
  getEntry,
  addPieceEntry,
  editPieceEntry,
  deletePieceEntry,
};
