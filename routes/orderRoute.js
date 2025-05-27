const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.get("/", orderController.getAllOrder); // /api/orders
router.get("/:id", orderController.getOrderById); // /api/orders/:id
router.post("/", auth, orderController.createOrder); // /api/orders
router.put("/:id", auth, orderController.updateOrder); // /api/orders/:id
router.delete("/:id", auth, orderController.deleteOrder); // /api/orders/:id

module.exports = router;
