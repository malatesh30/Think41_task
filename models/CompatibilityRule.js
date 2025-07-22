const mongoose = require("mongoose");

const CompatibilityRuleSchema = new mongoose.Schema({
  template_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductTemplate" },
  rule_type: { type: String, enum: ["REQUIRES", "INCOMPATIBLE_WITH"] },
  primary_choice_id: { type: mongoose.Schema.Types.ObjectId, ref: "OptionChoice" },
  secondary_choice_id: { type: mongoose.Schema.Types.ObjectId, ref: "OptionChoice" },
});

module.exports = mongoose.model("CompatibilityRule", CompatibilityRuleSchema);
