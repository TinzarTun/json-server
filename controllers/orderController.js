const axios = require("axios");
const API = "http://localhost:3003/orders";

module.exports.getAllOrder = async (_, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const orderID = req.params.id;
    const response = await axios.get(`${API}/${orderID}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createOrder = async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body.customerId ||
      !req.body.orderID ||
      !req.body.quantity ||
      !req.body.status
    ) {
      return res.status(400).json({ error: "All field are required" });
    }
    const newOrder = {
      customerId: req.body.customerId,
      orderID: req.body.orderID,
      quantity: req.body.quantity,
      status: req.body.status,
    };
    const response = await axios.post(API, newOrder);
    res.status(201).json({
      success: "Thanks for your order",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    const currentOrder = await axios.get(`${API}/${orderID}`);
    if (!currentOrder.data) {
      return res.status(404).json({ message: "Order not found" });
    }
    const newOrder = { ...currentOrder.data, ...req.body };
    const response = await axios.put(`${API}/${orderID}`, newOrder);
    res.status(200).json({
      success: "Your order is updated",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    await axios.delete(`${API}/${req.params.id}`);
    res.status(200).json({ message: "Your order is successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};