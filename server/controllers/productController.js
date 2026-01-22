import Product from "../models/productModel.js";

// @desc Add new product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products for current user
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if product belongs to user
    if (product.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if product belongs to user
    if (product.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
