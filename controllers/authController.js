const bcrypt = require("bcryptjs");
const axios = require("axios");
const { generateToken } = require("../utils/jwt");
const API = "http://localhost:3003/users"; // json-server port

// Register function
const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const existingUsers = await axios.get(API); // check user
    console.log(existingUsers.data);
    const user = existingUsers.data.find((u) => u.email === email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    await axios.post(API, newUser);
    res.json({ data: newUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login function
const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUsers = await axios.get(API);
    const user = existingUsers.data.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "User not register" });
    }
    // compare password
    const vaildPassword = await bcrypt.compare(password, user.password);
    if (!vaildPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password do not match" });
    }
    // generate token
    const token = generateToken(user);
    res.json({ token }); // token
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { register, login };
