function InventorySummary({ products, sales }) {
  const totalStockCost = products.reduce(
    (acc, p) => acc + p.buyPrice * p.quantity,
    0
  );
  const totalSellingValue = products.reduce(
    (acc, p) => acc + p.sellPrice * p.quantity,
    0
  );

  const totalRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);

  const totalProfitFromSales = sales.reduce((acc, s) => {
    const buyPrice = s.product?.buyPrice ?? 0;
    return acc + (s.sellPrice - buyPrice) * s.quantity;
  }, 0);

  const remainingPotentialProfit = products.reduce(
    (acc, p) => acc + (p.sellPrice - p.buyPrice) * p.quantity,
    0
  );

  const stats = [
    {
      title: "Total Stock Cost",
      value: totalStockCost,
      description: "Cost of remaining products",
      bg: "bg-indigo-500",
    },
    {
      title: "Total Selling Value",
      value: totalSellingValue,
      description: "Potential revenue of remaining stock",
      bg: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      description: "Revenue from sold products",
      bg: "bg-blue-500",
    },
    {
      title: "Profit (Sales)",
      value: totalProfitFromSales,
      description: "Profit made from sales",
      bg: "bg-yellow-500",
    },
    {
      title: "Estimated Profit",
      value: remainingPotentialProfit,
      description: "Profit if remaining stock sells",
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Inventory Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`${stat.bg} text-white p-4 rounded-lg shadow-md`}
          >
            <p className="text-sm font-medium uppercase">{stat.title}</p>
            <p className="text-2xl font-bold mt-1">
              ₹{stat.value.toLocaleString()}
            </p>
            <p className="text-xs opacity-80 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventorySummary;
