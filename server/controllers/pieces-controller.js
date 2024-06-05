const knex = require("knex")(require("../knexfile"));

async function getEntries(req, res) {
  //   const { userId } = req.params;
  try {
    const data = await knex
      .select(
        "pieces.id",
        "pieces.title",
        "pieces.description",
        knex.raw("GROUP_CONCAT(images.img_name) as images")
      )
      .from("pieces")
      .join("images", "pieces.id", "images.piece_id")
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
      .where({'user_id': 1, 'pieces.id':pieceId});
    //   .where("id", pieceId);
    if (!data) {
      return res.status(404);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json(`Error retrieving pieces entries: ${error}`);
  }
}

module.exports = {
  getEntries,
  getEntry
};
