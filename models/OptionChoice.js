const mongoose = require("mongoose");

const OptionChoiceSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "OptionCategory" },
  name: String,
  price_delta: Number,
});

module.exports = mongoose.model("OptionChoice", OptionChoiceSchema);
