require("dotenv").config()
require("./db/index");

const express = require("express");
const app = express();

const config = require("./config");
config(app);

const indexRouter = require("./routes/index.routes.js");
app.use("/api", indexRouter);



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const error = require("./errors");
error(app);

module.exports = app