const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
