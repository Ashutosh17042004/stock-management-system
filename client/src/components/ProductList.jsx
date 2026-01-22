function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="mb-8">
      {/* Section Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Product List
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              {/* Product Info */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600">
                Buy:{" "}
                <span className="font-semibold">
                  ₹{p.buyPrice.toLocaleString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Sell:{" "}
                <span className="font-semibold">
                  ₹{p.sellPrice.toLocaleString()}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Quantity: <span className="font-semibold">{p.quantity}</span>
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="flex-1 bg-indigo-600 text-white text-sm font-medium py-1 rounded hover:bg-indigo-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(p._id)}
                  className="flex-1 bg-red-500 text-white text-sm font-medium py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
