const express = require("express");
const router = express.Router();
const controller = require("../controllers/productConfigController");

router.post("/product-templates", controller.createProductTemplate);
router.post("/product-templates/:templateId/option-categories", controller.addOptionCategory);
router.post("/option-categories/:categoryId/choices", controller.addOptionChoice);
router.post("/product-templates/:templateId/compatibility-rules", controller.addCompatibilityRule);
router.post("/product-templates/:templateId/validate-configuration", controller.validateConfiguration);

module.exports = router;
