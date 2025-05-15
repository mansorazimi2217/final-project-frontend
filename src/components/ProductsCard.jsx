import React from "react";
import dayjs from "dayjs";
import { Plus, Trash2, Pencil } from "lucide-react";

function ProductsCard({
  filteredProducts,
  isExpiringSoon,
  isExpired,
  getStockLabel,
  handleEditClick,
  setDeleteModal,
  setAddModal,
  setSearch,
  search,
}) {
  return (
    <>
      <div className="w-full px-4 md:px-8 lg:px-16 pt-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="flex items-center gap-2 bg-[#006EBD] hover:bg-[#006ECE] text-white px-4 py-2 rounded-xl shadow-md w-full md:w-auto justify-center"
            onClick={() => setAddModal(true)}
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 lg:px-16 pt-12">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-101 p-1 flex flex-col relative animate-fadeInSmooth"
          >
            <img
              src={`http://localhost:3000${product.img}`}
              alt={product.name}
              className="w-full h-60 object-cover rounded-xl mb-2 transition duration-300 hover:brightness-90"
            />

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-md font-semibold text-gray-700">
                  {product.name}
                </h2>
                <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-2">{product.desc}</p>
              <p className="text-gray-600 text-sm">
                Company: <span className="font-medium">{product.brand}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Selling Price:{" "}
                <span className="font-medium">
                  {product.selling_price} {product.currency}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Buying Price:{" "}
                <span className="font-medium">
                  {product.buy_price} {product.currency}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Stock: <span className="font-medium">{product.quantity}</span>
              </p>
              {/* <p className="text-gray-600 text-sm ">
                Arrival: {dayjs(product.come_date).format("MMM D, YYYY")}
              </p> */}
              {product.expire_date && (
                <p className="text-gray-600 text-sm">
                  Expires: {dayjs(product.expire_date).format("MMM D, YYYY")}
                </p>
              )}

              <div className="flex justify-between items-end mt-auto pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-sky-500 hover:text-sky-600"
                  >
                    <Pencil size={25} />
                  </button>
                  <button
                    onClick={() => setDeleteModal(product)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={25} />
                  </button>
                </div>
                <div className="flex flex-row gap-1">
                  {isExpiringSoon(product.expire_date) && (
                    <span
                      className={`text-xs px-2 py-2 rounded-[5px] ${
                        isExpired(product.expire_date)
                          ? "bg-red-500 text-white"
                          : "bg-red-300 text-white"
                      }`}
                    >
                      {isExpired(product.expire_date)
                        ? "Expired"
                        : "Expiring Soon"}
                    </span>
                  )}
                  {getStockLabel(product.quantity) && (
                    <span className="text-xs px-2 py-2 rounded-[5px] bg-yellow-400 text-gray-900">
                      {getStockLabel(product.quantity)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsCard;

// <>
//   <div className="w-full px-4 md:px-8 lg:px-16 pt-6">
//     <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">
//       <input
//         type="text"
//         placeholder="Search products..."
//         className="px-4 py-2 rounded-xl border border-gray-300 w-full md:w-64"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <button
//         className="flex items-center gap-2 bg-[#006EBD] hover:bg-[#006ECE] text-white px-4 py-2 rounded-xl shadow-md w-full md:w-auto justify-center"
//         onClick={() => setAddModal(true)}
//       >
//         <Plus size={18} /> Add Product
//       </button>
//     </div>
//   </div>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 lg:px-16 pt-12">
//     {filteredProducts.map((product) => (
//       <div
//         key={product._id}
//         className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 p-1 flex flex-col relative animate-fadeInSmooth"
//       >
//         {isExpiringSoon(product.expire_date) &&
//           (isExpired(product.expire_date) ? (
//             <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//               Expired
//             </span>
//           ) : (
//             <span className="absolute top-3 right-3 bg-red-300 text-white text-xs px-2 py-1 rounded-full">
//               Expiring Soon
//             </span>
//           ))}

//         {getStockLabel(product.quantity) && (
//           <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full">
//             {getStockLabel(product.quantity)}
//           </span>
//         )}

//         <img
//           src={`http://localhost:3000${product.img}`}
//           alt={product.name}
//           className="w-full h-60 object-cover rounded-xl mb-4 transition duration-300 hover:brightness-90"
//         />

//         <div className="p-4">
//           <div className="flex flex-col flex-grow">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-md font-semibold text-gray-700">
//                 {product.name}
//               </h2>
//               <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
//                 {product.category}
//               </span>
//             </div>

//             <p className="text-gray-500 text-sm mb-2">{product.desc}</p>
//             <p className="text-gray-600 text-sm">
//               Company: <span className="font-medium">{product.brand}</span>
//             </p>
//             <p className="text-gray-600 text-sm">
//               Price:{" "}
//               <span className="font-medium">
//                 {product.selling_price} {product.currency}
//               </span>
//             </p>
//             <p className="text-gray-600 text-sm">
//               Stock: <span className="font-medium">{product.quantity}</span>
//             </p>
//             <p className="text-gray-600 text-sm mt-2">
//               Arrival: {dayjs(product.come_date).format("MMM D, YYYY")}
//             </p>
//             {product.expire_date && (
//               <p className="text-gray-600 text-sm">
//                 Expires: {dayjs(product.expire_date).format("MMM D, YYYY")}
//               </p>
//             )}

//             <div className="flex justify-between mt-4">
//               <button
//                 className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
//                 onClick={() => handleEditClick(product)}
//               >
//                 Update
//               </button>
//               <button
//                 className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
//                 onClick={() => setDeleteModal(product)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </>
