import { Phone, Mail } from "lucide-react";
import { Copy, Check } from "lucide-react";
import { Avatar } from "./DueMainContent";
import { useState } from "react";
import PhoneModal from "./PhoneModal";
function Customer_Card({
  customer,
  copied,
  onPayDue,
  setShowEmailModal,
  setCopied,
}) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
        <Avatar name={customer.name} />
        <h3 className="mt-3 text-lg font-semibold">{customer.name}</h3>

        {/* ID with copy functionality */}
        <div
          className="text-xs text-gray-500 flex items-center space-x-1 mt-1 cursor-pointer hover:underline"
          title="Click to copy ID"
          onClick={() => {
            navigator.clipboard.writeText(customer._id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          <span>
            <span className="text-blue-600">id : </span> {customer._id}
          </span>
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          )}
        </div>

        {/* Contact Icons */}
        <div className="flex space-x-6 mb-3 mt-3 text-[#006EBD]">
          {/* <a href={`tel:${customer.phone}`} title="Call customer">
            <Phone className="w-6 h-6 hover:text-[#0059a0]" />
          </a> */}
          <button
            onClick={() => setShowPhoneModal(true)}
            title="Show phone number"
            className="focus:outline-none"
          >
            <Phone className="w-6 h-6 hover:text-[#0059a0]" />
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            title="Email customer"
            className="focus:outline-none"
          >
            <Mail className="w-6 h-6 hover:text-[#0059a0] ml-4" />
          </button>
        </div>

        <div className="w-full border-t border-gray-200 mb-4"></div>

        {/* Customer Details */}
        <div className="w-full text-[15px] text-gray-700 space-y-2">
          <div className="flex justify-between px-2">
            <span className="font-medium">📞 Phone</span>
            <span>{customer.phone}</span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">📧 Email</span>
            <span>{customer.email}</span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">🏠 Address</span>
            <span className="text-right">{customer.address}</span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">🛒 Total Orders</span>
            <span>{customer.totalOrders}</span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">💰 Amount Due</span>
            <span className="text-red-500 font-semibold">
              ${customer.remainValue?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">💵 Total Spent</span>
            <span>${customer.totalSpent?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between px-2">
            <span className="font-medium">🗓 Last Purchase</span>
            <span>
              {customer.lastPurchaseAt
                ? new Date(customer.lastPurchaseAt).toLocaleDateString()
                : "Never"}
            </span>
          </div>
        </div>

        {/* Pay Due Button */}
        <div className="flex mt-5">
          <button
            onClick={onPayDue}
            className="bg-[#006EBD] text-white px-4 py-2 rounded hover:bg-[#0059a0] transition-colors"
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
