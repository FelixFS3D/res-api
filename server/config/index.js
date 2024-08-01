function config(app) {
  const cookieParser = require("cookie-parser");
  const express = require("express"); 
  const morgan = require("morgan");
  const cors = require("cors");

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  
  app.use(
    cors({
      origin: [process.env.ORIGIN],
    })
  );
}

module.exports = config;
