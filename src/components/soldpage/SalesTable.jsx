import { motion } from "framer-motion";

export default function SalesTable({ bills }) {
  return (
    <motion.div layout className="space-y-6">
      {bills.map((bill) => (
        <BillItem key={bill.id} bill={bill} />
      ))}
    </motion.div>
  );
}

function BillItem({ bill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100"
    >
      <BillHeader bill={bill} />
      <ProductsTable products={bill.products} />
    </motion.div>
  );
}

function BillHeader({ bill }) {
  const hasDue = bill.remainValue > 0;

  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-900">
              {bill.customerName}
            </h3>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 bg-[#e6f2ff] text-[#006EBD] text-xs font-medium rounded-full"
            >
              {bill.products.length}{" "}
              {bill.products.length === 1 ? "item" : "items"}
            </motion.span>
          </div>

          <p className="text-sm text-gray-500">
            {new Date(bill.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="text-xs text-blue-700 bg-blue-50 inline-flex items-center px-2 py-1 rounded-full font-medium">
            🆔 Customer ID:
            <span className="ml-1">{bill.customerId}</span>
          </div>
        </div>

        {/* Price Info */}
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="text-[17px] text-gray-700 font-medium"
          >
            💵 Total Price:{" "}
            <span className="font-bold text-[#006EBD]">
              ${bill.total.toLocaleString()}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="text-[17px] text-gray-700 font-medium"
          >
            ✅ Total Paid:{" "}
            <span className="font-bold text-green-600">
              ${bill.totalPaied.toLocaleString()}
            </span>
          </motion.div>

          {hasDue && (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="text-[17px] text-gray-700 font-medium"
            >
              ❗ Remaining:{" "}
              <span className="font-bold text-red-500">
                ${bill.remainValue.toLocaleString()}
              </span>
            </motion.div>
          )}
        </div>

        {/* Summary Badge */}
        <div className="flex flex-col justify-center lg:items-end mt-4 md:mt-0">
          <div
            className={`text-sm font-semibold px-4 py-2 rounded-full w-fit ${
              hasDue ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
            }`}
          >
            {hasDue ? "Payment Due" : "Fully Paid"}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow({ product }) {
  console.log("hello fack you :  " + product.name + product.image);
  return (
    <motion.tr
      whileHover={{ backgroundColor: "#f9fafb" }}
      className="transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 h-10 w-10 overflow-hidden rounded-md"
          >
            {/* <img
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              src={product.image}
              alt={product.name}
            /> */}
            <img
              src={
                product.image === "https://via.placeholder.com/50"
                  ? "/pp.png"
                  : product.image
              }
              alt={product.name || "Item"}
              className="w-12 h-12 rounded-lg object-cover border border-gray-300 shadow-sm"
            />
          </motion.div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.price.toLocaleString()}$
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.total.toLocaleString()}$
      </td>
    </motion.tr>
  );
}
