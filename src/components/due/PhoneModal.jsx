export default function PhoneModal({ customer, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">📞 Customer Phone Number</h2>
        <p className="text-gray-700 mb-3">
          You can call <span className="font-medium">{customer.name}</span> at:
        </p>
        <p className="text-blue-600 text-xl font-semibold mb-4">
          {customer.phone}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Direct call is currently disabled. Please use this number manually.
        </p>
        <button
          onClick={onClose}
          className="bg-[#006EBD] text-white px-4 py-2 rounded hover:bg-[#0059a0] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
