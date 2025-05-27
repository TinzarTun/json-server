const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/", productController.getAllProduct); // /api/products
router.get("/:id", productController.getProductById); // /api/products/:id
router.post("/", auth, productController.createProduct); // /api/products
router.put("/:id", auth, productController.updateProduct); // /api/products/:id
router.delete("/:id", auth, productController.deleteProduct); // /api/products/:id

module.exports = router;
