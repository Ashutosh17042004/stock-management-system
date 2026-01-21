import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";


dotenv.config();

// Create app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // to read JSON bodies

// Routes

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("Inventory API Running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
