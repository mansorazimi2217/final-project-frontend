// import React, { useState, useEffect } from "react";
// import { useAuthContext } from "../../hooks/useAuthContext";

// const ExpenseModal = ({
//   isOpen,
//   onClose,
//   expense,
//   categories,
//   paymentMethods,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState({
//     date: "",
//     category: "",
//     amount: "",
//     paymentMethod: "",
//     notes: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null); // success/error messag
//   const { user } = useAuthContext();

//   useEffect(() => {
//     if (expense) {
//       setFormData({
//         date: expense.date || "",
//         category: expense.category || "",
//         amount: expense.amount || "",
//         paymentMethod: expense.paymentMethod || "",
//         notes: expense.notes || "",
//       });
//     } else {
//       setFormData({
//         date: new Date().toISOString().split("T")[0],
//         category: "",
//         amount: "",
//         paymentMethod: "",
//         notes: "",
//       });
//     }
//   }, [expense]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     const expenseData = {
//       ...formData,
//       amount: parseFloat(formData.amount),
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/expenses", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(expenseData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({ type: "success", text: "Expense saved successfully!" });
//         onSubmit(data); // callback to parent (e.g., refresh list)
//         setTimeout(() => {
//           setMessage(null);
//           onClose();
//         }, 1000);
//       } else {
//         throw new Error(data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">
//             {expense ? "Edit Expense" : "Add New Expense"}
//           </h3>

//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Amount ($)
//                 </label>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                   min="0"
//                   step="0.01"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Payment Method
//                 </label>
//                 <select
//                   name="paymentMethod"
//                   value={formData.paymentMethod}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Select Method</option>
//                   {paymentMethods.map((method) => (
//                     <option key={method} value={method}>
//                       {method}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Additional details about this expense..."
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {message && (
//               <div
//                 className={`mt-4 text-sm ${
//                   message.type === "success" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className={`px-4 py-2 rounded-lg text-white transition ${
//                   loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//                 disabled={loading}
//               >
//                 {loading
//                   ? expense
//                     ? "Updating..."
//                     : "Adding..."
//                   : expense
//                   ? "Update Expense"
//                   : "Add Expense"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default ExpenseModal;
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ExpenseModal = ({
  isOpen,
  onClose,
  expense,
  categories,
  paymentMethods,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    paymentMethod: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (expense) {
      setFormData({
        date: expense.date?.split("T")[0] || "",
        category: expense.category || "",
        amount: expense.amount || "",
        paymentMethod: expense.paymentMethod || "",
        notes: expense.notes || "",
      });
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        category: "",
        amount: "",
        paymentMethod: "",
        notes: "",
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    const isEditing = Boolean(expense);
    const url = isEditing
      ? `http://localhost:3000/api/expenses/${expense._id}`
      : "http://localhost:3000/api/expenses";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: isEditing
            ? "Expense updated successfully!"
            : "Expense added successfully!",
        });
        onSubmit(data);
        setTimeout(() => {
          setMessage(null);
          onClose();
          window.location.reload();
        }, 1000);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {expense ? "Edit Expense" : "Add New Expense"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Method</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Additional details..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Feedback Message */}
            {message && (
              <div
                className={`mt-4 text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? expense
                    ? "Updating..."
                    : "Adding..."
                  : expense
                  ? "Update Expense"
                  : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
