import React from "react";

const MainContent = ({ isSidebarOpen }) => {
  const stats = [
    { title: "Total Customers", value: "0", change: "0%", icon: "👥" },
    { title: "Total Sells", value: "0", change: "0%", icon: "💰" },
    { title: "Conversion", value: "0", change: "0%", icon: "📊" },
  ];

  const recentActivities = [
    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },

    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },
    { user: "Name", action: "0", time: "0", price: "0" },
  ];

  const lowQuantityStock = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      quantity: 0,
      threshold: 0,
    },
    {
      name: "Organic Coffee Beans",
      category: "Groceries",
      quantity: 0,
      threshold: 0,
    },
    { name: "Yoga Mat", category: "Fitness", quantity: 0, threshold: 0 },
    { name: "Ceramic Mugs", category: "Kitchen", quantity: 0, threshold: 0 },
    {
      name: "Bluetooth Speaker",
      category: "Electronics",
      quantity: 0,
      threshold: 0,
    },
    {
      name: "Notebook Set",
      category: "Stationery",
      quantity: 0,
      threshold: 0,
    },
  ];
  return (
    <div
      className={`pt-16 px-4 md:px-8 transition-all duration-300 ${
        isSidebarOpen ? "ml-0 md:ml-64" : "ml-0"
      }`}
    >
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                  <p
                    className={`text-sm mt-1 ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change} from yesterday
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
              {" "}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  {" "}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
