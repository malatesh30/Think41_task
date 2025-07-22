const ProductTemplate = require("../models/ProductTemplate");
const OptionCategory = require("../models/OptionCategory");
const OptionChoice = require("../models/OptionChoice");
const CompatibilityRule = require("../models/CompatibilityRule");

// 1. Create Product Template
exports.createProductTemplate = async (req, res) => {
  try {
    const { name, base_price } = req.body;
    const template = await ProductTemplate.create({ name, base_price });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Add Option Category
exports.addOptionCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { templateId } = req.params;
    const category = await OptionCategory.create({ name, template_id: templateId });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Add Option Choice
exports.addOptionChoice = async (req, res) => {
  try {
    const { name, price_delta } = req.body;
    const { categoryId } = req.params;
    const choice = await OptionChoice.create({ name, price_delta, category_id: categoryId });
    res.status(201).json(choice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Add Compatibility Rule
exports.addCompatibilityRule = async (req, res) => {
  try {
    const { rule_type, primary_choice_id, secondary_choice_id } = req.body;
    const { templateId } = req.params;
    const rule = await CompatibilityRule.create({
      template_id: templateId,
      rule_type,
      primary_choice_id,
      secondary_choice_id,
    });
    res.status(201).json(rule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Validate Configuration
exports.validateConfiguration = async (req, res) => {
  try {
    const { selections } = req.body; // selections: { categoryName: choice_id, ... }
    const { templateId } = req.params;

    const selectedChoiceIds = Object.values(selections);
    const selectedChoices = await OptionChoice.find({ _id: { $in: selectedChoiceIds } });

    const template = await ProductTemplate.findById(templateId);
    if (!template) return res.status(404).json({ error: "Template not found" });

    let total_price = template.base_price;
    selectedChoices.forEach(choice => {
      total_price += choice.price_delta;
    });

    const rules = await CompatibilityRule.find({ template_id: templateId });
    const errors = [];

    for (const rule of rules) {
      const primary = rule.primary_choice_id.toString();
      const secondary = rule.secondary_choice_id.toString();
      const selected = new Set(selectedChoiceIds.map(id => id.toString()));

      if (rule.rule_type === "REQUIRES" && selected.has(primary) && !selected.has(secondary)) {
        errors.push(`Choice ${primary} REQUIRES ${secondary}`);
      }
      if (rule.rule_type === "INCOMPATIBLE_WITH" && selected.has(primary) && selected.has(secondary)) {
        errors.push(`Choice ${primary} INCOMPATIBLE WITH ${secondary}`);
      }
    }

    if (errors.length > 0) {
      return res.json({ is_valid: false, errors });
    }

    res.json({ is_valid: true, total_price, selections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
