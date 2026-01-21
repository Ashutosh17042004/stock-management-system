import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  soldAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sale", saleSchema);
