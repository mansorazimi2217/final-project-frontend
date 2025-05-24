import { useState } from "react";

const PayDueModal = ({ isOpen, onClose, customer, onPay }) => {
  const [payAmount, setPayAmount] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !customer) return null;

  const amountDue = customer.remainValue || 0;

  const handleSubmit = () => {
    const pay = parseFloat(payAmount);
    if (isNaN(pay) || pay <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (pay > amountDue) {
      setError("Pay Due can't be more than Amount Due");
      return;
    }

    console.log(customer);
    onPay(customer._id, customer.name, customer.remainValue, pay);
    setPayAmount("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Pay Due - {customer.name}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Amount Due
          </label>
          <input
            type="text"
            value={`$${amountDue.toFixed(2)}`}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">
            Pay Due Amount
          </label>
          <input
            type="number"
            value={payAmount}
            onChange={(e) => {
              setPayAmount(e.target.value);
              setError("");
            }}
            className="w-full border rounded px-3 py-2"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#006EBD] text-white rounded hover:bg-[#0059a0]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayDueModal;
