import Product from "../models/productModel.js";
import Sale from "../models/saleModel.js";

export const recordSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product belongs to user
    if (product.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to sell this product" });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Reduce stock
    product.quantity = product.quantity - quantity;
    await product.save();

    // Compute sale values
    const totalAmount = product.sellPrice * quantity;

    // Create sale record
    const sale = await Sale.create({
      product: productId,
      userId: req.user.id,
      quantity,
      sellPrice: product.sellPrice,
      totalAmount,
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSalesHistory = async (req, res) => {
  try {
    // Read query params for date range
    const { startDate, endDate } = req.query;

    // Build a filter object
    let filter = { userId: req.user.id };

    if (startDate && endDate) {
      // Convert query strings to proper Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Adjust end date so filter includes that date entirely
      end.setHours(23, 59, 59, 999);

      filter.soldAt = {
        $gte: start,
        $lte: end,
      };
    }

    const sales = await Sale.find(filter).populate("product", "name sellPrice");
    return res.status(200).json(sales);
  } catch (error) {
    console.error("Sales history fetch error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to fetch sales history", error: error.message });
  }
};
