const mongoose = require("mongoose");

const ProductTemplateSchema = new mongoose.Schema({
  name: String,
  base_price: Number,
});

module.exports = mongoose.model("ProductTemplate", ProductTemplateSchema);
