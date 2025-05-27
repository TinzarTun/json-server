const bcrypt = require("bcryptjs");
const axios = require("axios");
const { generateToken } = require("../utils/jwt");
const API = "http://localhost:3003/customers";

// Register
module.exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const existingCustomers = await axios.get(API); // check customer
    console.log(existingCustomers.data);
    const customer = existingCustomers.data.find((c) => c.email === email);
    if (customer) {
      return res.status(400).json({ message: "Customer already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create customer
    const newCustomer = {
      name,
      email,
      password: hashedPassword,
    };
    await axios.post(API, newCustomer);
    res.json({
      data: newCustomer,
      message: "Customer registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering customer" });
  }
};

// Login
module.exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingCustomers = await axios.get(API);
    const customer = existingCustomers.data.find((c) => c.email === email);
    if (!customer) {
      return res.status(401).json({ message: "Customer not register" });
    }
    // compare password
    const vaildPassword = await bcrypt.compare(password, customer.password);
    if (!vaildPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password do not match" });
    }
    // generate token
    const token = generateToken(customer);
    res.json({ token }); // token
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
