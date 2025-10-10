import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import EarningReportPage from "./EarningReport";

const MainContent = ({ isSidebarOpen }) => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState([
    { title: "Total Customers", value: "0", change: "0%", icon: "👥" },
    { title: "Total products", value: "0", change: "0%", icon: "📦" },
  ]);
  const [lowQuantityStock, setLowQuantityStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recentActivities, setRecentActivities] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch customers data
        const customersRes = await axios.get(
          "http://localhost:3000/api/customers/",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const totalCustomers = customersRes.data.length;

        // Fetch products data
        const productsRes = await axios.get(
          "http://localhost:3000/api/products/",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const totalProducts = productsRes.data.length;
        const products = productsRes.data;
        const lowQuantityProducts = productsRes.data
          .filter((product) => product.quantity < 10)
          .map((product) => ({
            name: product.name,
            category: product.category,
            quantity: product.quantity,
          }));

        const sortedBySales = [...products]
          .filter((product) => product.totalSold > 0) // Exclude those with totalSold = 0 or falsy
          .sort((a, b) => b.totalSold - a.totalSold)
          .slice(0, 10) // Limit to top 10
          .map((product) => ({
            user: product.name,
            action: product.totalSold,
            time: product.quantity, // Remaining stock
            price: product.selling_price || 0,
          }));

        // Update state
        setStats([
          {
            title: "Total Customers",
            value: totalCustomers.toString(),
            icon: "👥",
          },
          {
            title: "Total products",
            value: totalProducts.toString(),
            icon: "📦",
          },
        ]);

        setRecentActivities(sortedBySales);
        setLowQuantityStock(lowQuantityProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div
      className={`pt-16 px-4 md:px-8 transition-all duration-300 ${
        isSidebarOpen ? "ml-0 md:ml-64" : "ml-0"
      }`}
    >
      <EarningReportPage />
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold mt-1 text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Selling Stock
            </h2>
            <div className="overflow-x-auto" style={{ maxHeight: "300px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sale Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remaining Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-800">
                            {activity.user}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {activity.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {activity.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-0 rounded-lg shadow-sm border border-gray-100 h-[460px] flex flex-col">
            <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-800">
                Low Quantity Stock
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-3 py-3">
                {lowQuantityStock.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <span className="text-red-600">📦</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-600">
                        {item.quantity} left
                      </p>
                      <p className="text-xs text-gray-500">
                        Threshold: {item.threshold}
                      </p>
                    </div>
                  </div>
                ))}
                {lowQuantityStock.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No low quantity products
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
