import { useState } from "react";
import axiosClient from "../api/axiosClient";

function SellProduct({ products, onSale }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/sales", {
        productId,
        quantity: Number(quantity),
      });

      alert("Sale recorded!");
      setQuantity("");
      setProductId("");

      if (onSale) onSale(); // Refresh parent
    } catch (error) {
      console.error("Error recording sale:", error);
      alert(error.response?.data?.message || "Failed to record sale");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Sell Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Product
          </label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Choose a product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.quantity})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity to Sell
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
          Sell
        </button>
      </form>
    </div>
  );
}

export default SellProduct;
