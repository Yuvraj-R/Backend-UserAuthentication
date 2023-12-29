require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  }
});

app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests, (port number, corresponding function)
    app.listen(process.env.PORT, () => {
      console.log("connected to db, and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
