const knex = require("knex")(require("../knexfile"));
const requiredKeys = ["title", "clay_type", "stage", "description", "glaze"];

async function getEntries(req, res) {
  try {
    const data = await knex
      .select(
        "pieces.id",
        "pieces.title",
        "pieces.description",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .leftJoin("images", "pieces.id", "images.piece_id")
      .groupBy("pieces.id")
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
    const imageExists = await pieceImageExists(pieceId)

    if (!imageExists){
      const data = await knex
      .select(
        "pieces.id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
      )
      .from("pieces")
      .where({ user_id: 1, "pieces.id": pieceId });

      if (!data) {
        return res.status(404);
      } else {
        return res.status(200).json(data[0]);
      }
    }
    const data = await knex
      .select(
        "pieces.id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .join("images", "pieces.id", "images.piece_id")
      .groupBy("pieces.id")
      .where({ user_id: 1, "pieces.id": pieceId });
      console.log(data)
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
      .send("Please make sure to fill in all fields in the request");
  }

  const newPiece = {
    title: body.title,
    clay_type: body.clay_type,
    stage: body.stage,
    description: body.description,
    glaze: body.glaze,
    user_id: body.user_id,
  };

  // const pieceImages = {
  //   images: body.images,
  // };

  try {
    // const insertedId = await knex("pieces").insert(newPiece).returning("id");
    // console.log(insertedId);

    await knex("pieces").insert(newPiece);

    const data = await knex("pieces").where({ title: newPiece.title });
    res.status(201).send(data[0]);
  } catch (error) {
    res.status(400).send(`Error inserting entry to database: ${error.message}`);
  }
}

async function editPieceEntry(req, res) {
  const pieceId = req.params.id;
  const body = req.body;

  const pieceExists = await pieceEntryExists(pieceId);
  if (!pieceExists) {
    return res.status(404).send(`Piece Id ${pieceId} Not Found.`);
  }

  const allRequiredSet = requiredKeys.every((i) =>
    Object.keys(req.body).includes(i)
  );
  const hasEmptyValues = Object.values(req.body).some(
    (value) => value === "" || value === null || value.length === 0
  );
  const requestValid = allRequiredSet && !hasEmptyValues;
  if (!requestValid) {
    return res
      .status(400)
      .send({
        error: `Invalid request. All fields must be set ${requiredKeys}.`,
      });
  }

  const imageExists = await pieceImageExists(pieceId)
  if(!imageExists){
    try {
      await knex("pieces").where("id", pieceId).update(req.body);
  
      const data = await knex.select(
        "title",
        "clay_type",
        "stage",
        "description",
        "glaze"
      )
      .from("pieces")
      .where("id", pieceId).first();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(`Error inserting entry to database: ${error.message}`);
    }
  }

  try {
    await knex
      .select(
        "pieces.id",
        "pieces.title",
        "pieces.description",
        "pieces.clay_type",
        "pieces.stage",
        "pieces.glaze",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .join("images", "pieces.id", "images.piece_id")
      .groupBy("pieces.id")
      .where({ user_id: 1, "pieces.id": pieceId }).update(req.body);

    const data = await knex
    .select(
      "pieces.id",
      "pieces.title",
      "pieces.description",
      "pieces.clay_type",
      "pieces.stage",
      "pieces.glaze",
      knex.raw("GROUP_CONCAT(images.img_name) as images")
    )
    .from("pieces")
    .join("images", "pieces.id", "images.piece_id")
    .groupBy("pieces.id")
    .where("id", pieceId).first();
    if (!data) {
      return res.status(404);
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    res.status(400).send(`Error inserting entry to database: ${error.message}`);
  }
 
}

async function deletePieceEntry(req, res) {
  const pieceId = req.params.id;

  try {
    const data = await knex('pieces').where('id', pieceId).del();
    if (!data) {
      res.sendStatus(404)
    } else {
      res.status(200).json(`${data} entry deleted`)
    }
  } catch (error) {
    res.status(400).send(`Error retrieving inventory: ${error}`)
  }
}

const pieceEntryExists = async(id) => {
  const existingItem = await knex('pieces').where('id', id);
  return !!existingItem.length;
};

const pieceImageExists = async(id) => {
  const existingItem = await knex('images').where('piece_id', id);
  return !!existingItem.length;
};


module.exports = {
  getEntries,
  getEntry,
  addPieceEntry,
  editPieceEntry,
  deletePieceEntry
};
