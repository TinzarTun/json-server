const express = require("express");
const router = express.Router();
const catagoriesController = require("../controllers/categoriesController");
const auth = require("../middleware/auth");

router.get("/", catagoriesController.getAllCatagories); // /api/categories
router.get("/:id", catagoriesController.getCatagoriesById); // /api/categories/:id
router.post("/", auth, catagoriesController.createCatagories); // /api/categories
router.put("/:id", auth, catagoriesController.updateCatagories); // /api/categories/:id
router.delete("/:id", auth, catagoriesController.deleteCatagories); // /api/categories/:id

module.exports = router;
