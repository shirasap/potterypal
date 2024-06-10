require("dotenv").config();
const express = require("express");
const cors = require("cors");
const piecesRoutes = require ("./routes/pieces")
const multer = require('multer');

const { PORT } = process.env;
const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"-" +file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.use("/api/pieces", upload.single('images'),  piecesRoutes)
app.use("/images", express.static("uploads"))

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
