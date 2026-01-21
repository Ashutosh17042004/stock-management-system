import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    try {
      let url = "/sales";
      if (startDate && endDate) {
        url += `?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
      }
      const res = await axiosClient.get(url);
      setSales(res.data);
      setError(null);
    } catch (err) {
      console.error("Sales history error:", err);
      setError(err.response?.data?.message || "Failed to load sales history");
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sales History
      </h2>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          onClick={fetchSales}
          className="mt-3 sm:mt-6 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
        >
          Filter
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Qty
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Sell Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-3 text-center text-sm text-gray-500"
                >
                  No sales recorded for the selected range.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {s.product?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {s.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    ₹{s.sellPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    ₹{s.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(s.soldAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesHistory;
