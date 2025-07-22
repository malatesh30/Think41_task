const mongoose = require("mongoose");

const OptionCategorySchema = new mongoose.Schema({
  template_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductTemplate" },
  name: String,
});

module.exports = mongoose.model("OptionCategory", OptionCategorySchema);
