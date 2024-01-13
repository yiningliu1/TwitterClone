require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./backend/config/dbConn");
const PORT = process.env.PORT || 3500;

// connect to MongoDB
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/tweet", require("./backend/routes/tweet"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
