import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

function EditProduct({ product, onUpdate, onCancel }) {
  const [name, setName] = useState(product.name);
  const [buyPrice, setBuyPrice] = useState(product.buyPrice);
  const [sellPrice, setSellPrice] = useState(product.sellPrice);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(`/products/${product._id}`, {
        name,
        buyPrice: Number(buyPrice),
        sellPrice: Number(sellPrice),
        quantity: Number(quantity),
      });

      onUpdate(); // refresh list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Edit Product</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
        required
      />

      <input
        type="number"
        value={sellPrice}
        onChange={(e) => setSellPrice(e.target.value)}
        required
      />

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditProduct;
