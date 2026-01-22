import express from "express";
import { recordSale, getSalesHistory } from "../controllers/saleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All sale routes require authentication
router.use(protect);

// Create a sale
router.post("/", recordSale);

// List all sales
router.get("/", getSalesHistory);

export default router;
