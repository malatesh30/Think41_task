const express = require("express");
const mongoose = require("mongoose");
const configRoutes = require("./routes/productConfigRoutes");

const app = express();
app.use(express.json());
app.use("/api", configRoutes);

mongoose.connect("mongodb://localhost:27017/product-configurator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

module.exports = app;
