import { useEffect, useState } from "react";
import axiosClient from "./api/axiosClient";

import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import InventorySummary from "./components/InventorySummary";
import SellProduct from "./components/SellProduct";
import SalesHistory from "./components/SalesHistory";
import SalesChart from "./components/SalesChart";
import Login from "./components/Login";

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return token && user ? { token, user } : null;
  });

  const handleAuth = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(null);
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const res = await axiosClient.get("/sales");
      setSales(res.data);
    } catch (error) {
      console.error("Sales fetch error:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchProducts();
      fetchSales();
    }
  }, [auth]);

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEdit = (product) => setEditingProduct(product);
  const cancelEdit = () => setEditingProduct(null);
  const completeEdit = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / productsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (!auth) {
    return <Login onAuth={handleAuth} />;
  }

  return (
    <div className="App container mx-auto p-5">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Signed in as <strong>{auth.user.name}</strong>
          </span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Summary and Sales UI */}
      <InventorySummary products={products} sales={sales} />
      <SellProduct
        products={products}
        onSale={() => {
          fetchProducts();
          fetchSales();
        }}
      />

      <SalesChart />
      <SalesHistory />

      {/* Add Product */}
      <AddProduct onAdd={fetchProducts} />

      {/* Search + Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 my-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full lg:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-4">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="buyPrice">Buy Price</option>
            <option value="sellPrice">Sell Price</option>
            <option value="quantity">Quantity</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <ProductList
        products={currentProducts}
        onDelete={handleDelete}
        onEdit={startEdit}
      />

      {/* ✨ Slide-Down Edit Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          editingProduct ? "max-h-screen" : "max-h-0"
        }`}
      >
        {editingProduct && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 my-6 shadow-md">
            <EditProduct
              product={editingProduct}
              onUpdate={completeEdit}
              onCancel={cancelEdit}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border transition
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md border transition
              ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-indigo-100"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border transition
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
