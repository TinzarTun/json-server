const axios = require("axios");
const API = "http://localhost:3003/products";

module.exports.getAllProduct = async (_, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await axios.get(`${API}/${productId}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.stock
    ) {
      return res.status(400).json({ error: "All field are required" });
    }
    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    };
    const response = await axios.post(API, newProduct);
    res.status(201).json({
      success: "Product is successfully created",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const currentProduct = await axios.get(`${API}/${productID}`);
    if (!currentProduct.data) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newProduct = { ...currentProduct.data, ...req.body };
    const response = await axios.put(`${API}/${productID}`, newProduct);
    res.status(200).json({
      success: "Product is successfully updated",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    await axios.delete(`${API}/${req.params.id}`);
    res.status(200).json({ message: "Product is successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};