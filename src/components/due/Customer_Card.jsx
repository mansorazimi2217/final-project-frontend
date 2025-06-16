// import { Phone, Mail } from "lucide-react";
// import { Copy, Check } from "lucide-react";
// import { Avatar } from "./DueMainContent";
// import { useState } from "react";
// import PhoneModal from "./PhoneModal";
// function Customer_Card({
//   customer,
//   copied,
//   onPayDue,
//   setShowEmailModal,
//   setCopied,
// }) {
//   const [showPhoneModal, setShowPhoneModal] = useState(false);
//   return (
//     <div>
//       <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
//         <Avatar name={customer.name} />
//         <h3 className="mt-3 text-lg font-semibold">{customer.name}</h3>

//         {/* ID with copy functionality */}
//         <div
//           className="text-xs text-gray-500 flex items-center space-x-1 mt-1 cursor-pointer hover:underline"
//           title="Click to copy ID"
//           onClick={() => {
//             navigator.clipboard.writeText(customer._id);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//           }}
//         >
//           <span>
//             <span className="text-blue-600">id : </span> {customer._id}
//           </span>
//           {copied ? (
//             <Check className="w-4 h-4 text-green-500" />
//           ) : (
//             <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//           )}
//         </div>

//         {/* Contact Icons */}
//         <div className="flex space-x-6 mb-3 mt-3 text-[#006EBD]">
//           {/* <a href={`tel:${customer.phone}`} title="Call customer">
//             <Phone className="w-6 h-6 hover:text-[#0059a0]" />
//           </a> */}
//           <button
//             onClick={() => setShowPhoneModal(true)}
//             title="Show phone number"
//             className="focus:outline-none"
//           >
//             <Phone className="w-6 h-6 hover:text-[#0059a0]" />
//           </button>
//           <button
//             onClick={() => setShowEmailModal(true)}
//             title="Email customer"
//             className="focus:outline-none"
//           >
//             <Mail className="w-6 h-6 hover:text-[#0059a0] ml-4" />
//           </button>
//         </div>

//         <div className="w-full border-t border-gray-200 mb-4"></div>

//         {/* Customer Details */}
//         <div className="w-full text-[15px] text-gray-700 space-y-2">
//           <div className="flex justify-between px-2">
//             <span className="font-medium">📞 Phone</span>
//             <span>{customer.phone}</span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">📧 Email</span>
//             <span>{customer.email}</span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">🏠 Address</span>
//             <span className="text-right">{customer.address}</span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">🛒 Total Orders</span>
//             <span>{customer.totalOrders}</span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">💰 Amount Due</span>
//             <span className="text-red-500 font-semibold">
//               ${customer.remainValue?.toFixed(2) || "0.00"}
//             </span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">💵 Total Spent</span>
//             <span>${customer.totalSpent?.toFixed(2) || "0.00"}</span>
//           </div>
//           <div className="flex justify-between px-2">
//             <span className="font-medium">🗓 Last Purchase</span>
//             <span>
//               {customer.lastPurchaseAt
//                 ? new Date(customer.lastPurchaseAt).toLocaleDateString()
//                 : "Never"}
//             </span>
//           </div>
//         </div>

//         {/* Pay Due Button */}
//         <div className="flex mt-5">
//           <button
//             onClick={onPayDue}
//             className="bg-[#006EBD] text-white px-4 py-2 rounded hover:bg-[#0059a0] transition-colors"
//           >
//             Pay Due
//           </button>
//         </div>

//         {showPhoneModal && (
//           <PhoneModal
//             customer={customer}
//             onClose={() => setShowPhoneModal(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Customer_Card;

import { Phone, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Avatar } from "./DueMainContent";
import PhoneModal from "./PhoneModal";

function Customer_Card({
  customer,
  copied,
  onPayDue,
  setShowEmailModal,
  setCopied,
}) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 h-full">
        <Avatar name={customer.name} />
        <h3 className="mt-3 text-base sm:text-lg md:text-xl font-semibold">
          {customer.name}
        </h3>

        {/* ID with copy functionality */}
        <div
          className="text-xs sm:text-sm text-gray-500 flex items-center justify-center space-x-1 mt-1 cursor-pointer hover:underline w-full px-2"
          title="Click to copy ID"
          onClick={() => {
            navigator.clipboard.writeText(customer._id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          <span className="truncate max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
            <span className="text-blue-600">ID: </span>
            {customer._id}
          </span>
          {copied ? (
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
          ) : (
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600 flex-shrink-0" />
          )}
        </div>

        {/* Contact Icons - Equal spacing */}
        <div className="flex justify-center space-x-6 sm:space-x-8 mb-3 mt-3 text-[#006EBD]">
          <button
            onClick={() => setShowPhoneModal(true)}
            title={`Call ${customer.phone}`}
            className="focus:outline-none hover:text-[#0059a0] transition-colors"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            title={customer.email || "No email"}
            className="focus:outline-none hover:text-[#0059a0] transition-colors"
            onMouseEnter={() => setIsHoveringEmail(true)}
            onMouseLeave={() => setIsHoveringEmail(false)}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="w-full border-t border-gray-200 mb-3 sm:mb-4"></div>

        {/* Customer Details */}
        <div className="w-full text-sm sm:text-[15px] text-gray-700 space-y-2 sm:space-y-3">
          <div className="flex justify-between px-2">
            <span className="font-medium">📞 Phone</span>
            <span className="truncate pl-2 max-w-[120px] sm:max-w-[150px]">
              {customer.phone || "N/A"}
            </span>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">📧 Email</span>
            <div className="relative">
              <span
                className="block truncate pl-2 max-w-[120px] sm:max-w-[150px] text-left"
                onMouseEnter={() => setIsHoveringEmail(true)}
                onMouseLeave={() => setIsHoveringEmail(false)}
              >
                {customer.email || "N/A"}
              </span>
              {isHoveringEmail && customer.email && (
                <div className="absolute z-10 bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-normal break-all max-w-[280px]">
                  {customer.email}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">🏠 Address</span>
            <span className="text-right truncate pl-2 max-w-[120px] sm:max-w-[150px]">
              {customer.address || "N/A"}
            </span>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">🛒 Orders</span>
            <span>{customer.totalOrders || 0}</span>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">💰 Due</span>
            <span className="text-red-500 font-semibold">
              ${customer.remainValue?.toFixed(2) || "0.00"}
            </span>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">💵 Spent</span>
            <span>${customer.totalSpent?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="flex justify-between px-2">
            <span className="font-medium">🗓 Last Order</span>
            <span className="whitespace-nowrap">
              {customer.lastPurchaseAt
                ? new Date(customer.lastPurchaseAt).toLocaleDateString()
                : "Never"}
            </span>
          </div>
        </div>

        {/* Pay Due Button */}
        <div className="flex mt-4 sm:mt-5 w-full justify-center">
          <button
            onClick={onPayDue}
            className="bg-[#006EBD] text-white px-4 py-2 rounded hover:bg-[#0059a0] transition-colors text-sm sm:text-base w-full max-w-[200px]"
          >
            Pay Due
          </button>
        </div>

        {showPhoneModal && (
          <PhoneModal
            customer={customer}
            onClose={() => setShowPhoneModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Customer_Card;
