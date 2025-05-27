const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoute");
const postsRoutes = require("./routes/postsRoute");
const customerRoutes = require("./routes/customerRoute");
const categoriesRoutes = require("./routes/categoriesRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
app.use(express.json());
app.use("/api/auth", authRoutes); // localhost:3200/api/auth/login
app.use("/api/posts", postsRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/categories", categoriesRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
