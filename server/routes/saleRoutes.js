import express from "express";
import { recordSale, getSalesHistory } from "../controllers/saleController.js";
const router = express.Router();

// Create a sale
router.post("/", recordSale);

// List all sales
router.get("/", getSalesHistory);

export default router;
