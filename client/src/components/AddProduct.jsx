import { useState } from "react";
import axiosClient from "../api/axiosClient";

function AddProduct({ onAdd }) {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      buyPrice: Number(buyPrice),
      sellPrice: Number(sellPrice),
      quantity: Number(quantity),
    };

    try {
      await axiosClient.post("/products", newProduct);

      setName("");
      setBuyPrice("");
      setSellPrice("");
      setQuantity("");

      if (onAdd) onAdd();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g., Apple iPhone"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Buy Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Buy Price
          </label>
          <input
            type="number"
            placeholder="Enter buy price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Sell Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sell Price
          </label>
          <input
            type="number"
            placeholder="Enter sell price"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
