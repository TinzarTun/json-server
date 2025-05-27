const axios = require("axios");
const API = "http://localhost:3003/posts"; //json-server url

module.exports.getAllPosts = async (_, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await axios.get(`${API}/${postId}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !req.body.content || !req.body.userId) {
      return res.status(400).json({ error: "All field are required" });
    }
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    };
    const response = await axios.post(API, newPost);
    res.status(201).json({
      success: "Post created successfully",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentPost = await axios.get(`${API}/${postId}`);
    if (!currentPost.data) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newPost = { ...currentPost.data, ...req.body };
    const response = await axios.put(`${API}/${postId}`, newPost);
    res.status(200).json({
      success: "Post updated successfully",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    await axios.delete(`${API}/${req.params.id}`);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
