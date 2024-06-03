require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
  res.json("at get homepage content")
})

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
