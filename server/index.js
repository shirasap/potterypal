require("dotenv").config();
const express = require("express");
const cors = require("cors");
const piecesRoutes = require ("./routes/pieces")

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pieces", piecesRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
