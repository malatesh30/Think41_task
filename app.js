const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productConfigRoutes");

const app = express();
app.use(express.json());
app.use("/api", productRoutes);

mongoose.connect(process.env.url)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = app;
