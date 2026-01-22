// import { useState, useEffect } from "react";
// import axiosClient from "../api/axiosClient";

// function EditProduct({ product, onUpdate, onCancel }) {
//   const [name, setName] = useState(product.name);
//   const [buyPrice, setBuyPrice] = useState(product.buyPrice);
//   const [sellPrice, setSellPrice] = useState(product.sellPrice);
//   const [quantity, setQuantity] = useState(product.quantity);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axiosClient.put(`/products/${product._id}`, {
//         name,
//         buyPrice: Number(buyPrice),
//         sellPrice: Number(sellPrice),
//         quantity: Number(quantity),
//       });

//       onUpdate(); // refresh list
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//       <h3>Edit Product</h3>

//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         value={buyPrice}
//         onChange={(e) => setBuyPrice(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         value={sellPrice}
//         onChange={(e) => setSellPrice(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         required
//       />

//       <button type="submit">Update</button>
//       <button type="button" onClick={onCancel}>Cancel</button>
//     </form>
//   );
// }

// export default EditProduct;

// new*********************
import { useState } from "react";
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

      onUpdate();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Edit Product
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buy Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Buy Price
          </label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Sell Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sell Price
          </label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
