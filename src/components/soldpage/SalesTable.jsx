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
  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
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
        </div>
        <div className="mt-4 md:mt-0">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-[#006EBD]"
          >
            Total Price: {bill.total.toLocaleString()}
          </motion.span>
        </div>
        <div className="mt-4 md:mt-0">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-green-600"
          >
            Total Payed: {bill.totalPaied.toLocaleString()}
          </motion.span>
        </div>
        <div className="mt-4 md:mt-0">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-red-500"
          >
            Remain Value: {bill.remainValue.toLocaleString()}
          </motion.span>
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
            <img
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              src={product.image}
              alt={product.name}
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
        Rs {product.price.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        Rs {product.total.toLocaleString()}
      </td>
    </motion.tr>
  );
}
