const axios = require("axios");
const API = "http://localhost:3003/categories";

module.exports.getAllCatagories = async (_, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getCatagoriesById = async (req, res) => {
  try {
    const catagoriesId = req.params.id;
    const response = await axios.get(`${API}/${catagoriesId}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Catagories not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createCatagories = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !req.body.description || !req.body.id) {
      return res.status(400).json({ error: "All field are required" });
    }
    const newCatagories = {
      title: req.body.title,
      description: req.body.description,
      id: req.body.id,
    };
    const response = await axios.post(API, newCatagories);
    res.status(201).json({
      success: "Catagories is successfully created",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateCatagories = async (req, res) => {
  try {
    const catagoriesId = req.params.id;
    const currentCatagories = await axios.get(`${API}/${catagoriesId}`);
    if (!currentCatagories.data) {
      return res.status(404).json({ message: "Catagories not found" });
    }
    const newCat = { ...currentCatagories.data, ...req.body };
    const response = await axios.put(`${API}/${catagoriesId}`, newCat);
    res.status(200).json({
      success: "Catagories is successfully updated",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteCatagories = async (req, res) => {
  try {
    await axios.delete(`${API}/${req.params.id}`);
    res.status(200).json({ message: "Catagories is successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
