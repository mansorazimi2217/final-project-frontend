import React from "react";
import dayjs from "dayjs";
import { Plus, Trash2, Pencil, Search } from "lucide-react";

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
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="flex items-center gap-2 bg-[#006EBD] hover:bg-[#006ECE] text-white px-4 py-2 rounded-xl shadow-md w-full md:w-auto justify-center"
            onClick={() => setAddModal(true)}
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-100 p-8 rounded-2xl max-w-md w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 mb-6">
              {search
                ? "No products match your search. Try a different term."
                : "You don't have any products yet. Add your first product to get started."}
            </p>
            <button
              className="flex items-center gap-2 bg-[#006EBD] hover:bg-[#006ECE] text-white px-6 py-2 rounded-xl mx-auto"
              onClick={() => {
                setSearch("");
                setAddModal(true);
              }}
            >
              <Plus size={16} />
              {search ? "Clear search and add" : "Add Product"}
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default ProductsCard;

// import React from "react";
// import dayjs from "dayjs";
// import { Plus, Trash2, Pencil } from "lucide-react";

// function ProductsCard({
//   filteredProducts,
//   isExpiringSoon,
//   isExpired,
//   getStockLabel,
//   handleEditClick,
//   setDeleteModal,
//   setAddModal,
//   setSearch,
//   search,
// }) {
//   return (
//     <>
//       <div className="w-full px-4 md:px-8 lg:px-16 pt-6">
//         <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="px-4 py-2 rounded-xl bg-white border border-gray-300 w-full md:w-64"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <button
//             className="flex items-center gap-2 bg-[#006EBD] hover:bg-[#006ECE] text-white px-4 py-2 rounded-xl shadow-md w-full md:w-auto justify-center"
//             onClick={() => setAddModal(true)}
//           >
//             <Plus size={18} /> Add Product
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 lg:px-16 pt-12">
//         {filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-101 p-1 flex flex-col relative animate-fadeInSmooth"
//           >
//             <img
//               src={`http://localhost:3000${product.img}`}
//               alt={product.name}
//               className="w-full h-60 object-cover rounded-xl mb-2 transition duration-300 hover:brightness-90"
//             />

//             <div className="p-4 flex flex-col flex-grow">
//               <div className="flex justify-between items-center mb-1">
//                 <h2 className="text-md font-semibold text-gray-700">
//                   {product.name}
//                 </h2>
//                 <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
//                   {product.category}
//                 </span>
//               </div>

//               <p className="text-gray-500 text-sm mb-2">{product.desc}</p>
//               <p className="text-gray-600 text-sm">
//                 Company: <span className="font-medium">{product.brand}</span>
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Selling Price:{" "}
//                 <span className="font-medium">
//                   {product.selling_price} {product.currency}
//                 </span>
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Buying Price:{" "}
//                 <span className="font-medium">
//                   {product.buy_price} {product.currency}
//                 </span>
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Stock: <span className="font-medium">{product.quantity}</span>
//               </p>
//               {/* <p className="text-gray-600 text-sm ">
//                 Arrival: {dayjs(product.come_date).format("MMM D, YYYY")}
//               </p> */}
//               {product.expire_date && (
//                 <p className="text-gray-600 text-sm">
//                   Expires: {dayjs(product.expire_date).format("MMM D, YYYY")}
//                 </p>
//               )}

//               <div className="flex justify-between items-end mt-auto pt-2">
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEditClick(product)}
//                     className="text-sky-500 hover:text-sky-600"
//                   >
//                     <Pencil size={25} />
//                   </button>
//                   <button
//                     onClick={() => setDeleteModal(product)}
//                     className="text-red-500 hover:text-red-600"
//                   >
//                     <Trash2 size={25} />
//                   </button>
//                 </div>
//                 <div className="flex flex-row gap-1">
//                   {isExpiringSoon(product.expire_date) && (
//                     <span
//                       className={`text-xs px-2 py-2 rounded-[5px] ${
//                         isExpired(product.expire_date)
//                           ? "bg-red-500 text-white"
//                           : "bg-red-300 text-white"
//                       }`}
//                     >
//                       {isExpired(product.expire_date)
//                         ? "Expired"
//                         : "Expiring Soon"}
//                     </span>
//                   )}
//                   {getStockLabel(product.quantity) && (
//                     <span className="text-xs px-2 py-2 rounded-[5px] bg-yellow-400 text-gray-900">
//                       {getStockLabel(product.quantity)}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default ProductsCard;
