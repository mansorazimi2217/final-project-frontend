import React from "react";
import ExpensesPage from "./ExpensesPage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function ExpensesLayout() {
  return (
    <div className="h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar + Main content */}
      <div className="flex pt-[45px] h-full">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-100 h-full overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto h-full">
          <ExpensesPage />
        </main>
      </div>
    </div>
  );
}

export default ExpensesLayout;
// import React, { useState, useEffect } from "react";
// import {
//   FiPlus,
//   FiFilter,
//   FiSearch,
//   FiTrash2,
//   FiEdit,
//   FiDownload,
//   FiPieChart,
// } from "react-icons/fi";
// import {
//   MdOutlineAttachMoney,
//   MdOutlineAccountBalance,
//   MdPayments,
// } from "react-icons/md";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// const ExpenseSummaryCards = ({ filteredExpenses }) => {
//   const totals = {
//     all: filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
//     cash: filteredExpenses
//       .filter((e) => e.paidBy === "Cash")
//       .reduce((sum, e) => sum + e.amount, 0),
//     bank: filteredExpenses
//       .filter((e) => e.paidBy === "Bank")
//       .reduce((sum, e) => sum + e.amount, 0),
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm opacity-80">Total Expenses</p>
//             <p className="text-2xl font-bold">{formatCurrency(totals.all)}</p>
//             <p className="text-xs mt-1 opacity-80">
//               {filteredExpenses.length} transactions
//             </p>
//           </div>
//           <div className="bg-white bg-opacity-20 p-3 rounded-full">
//             <MdOutlineAttachMoney className="text-2xl" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm opacity-80">Paid by Cash</p>
//             <p className="text-2xl font-bold">{formatCurrency(totals.cash)}</p>
//             <p className="text-xs mt-1 opacity-80">
//               {filteredExpenses.filter((e) => e.paidBy === "Cash").length}{" "}
//               transactions
//             </p>
//           </div>
//           <div className="bg-white bg-opacity-20 p-3 rounded-full">
//             <MdPayments className="text-2xl" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm opacity-80">Paid by Bank</p>
//             <p className="text-2xl font-bold">{formatCurrency(totals.bank)}</p>
//             <p className="text-xs mt-1 opacity-80">
//               {filteredExpenses.filter((e) => e.paidBy === "Bank").length}{" "}
//               transactions
//             </p>
//           </div>
//           <div className="bg-white bg-opacity-20 p-3 rounded-full">
//             <MdOutlineAccountBalance className="text-2xl" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExpenseFilters = ({ filters, setFilters, categories }) => {
//   const [showFilters, setShowFilters] = useState(false);

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
//       <div className="flex items-center gap-4">
//         <div className="relative flex-1">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search expenses..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//             showFilters
//               ? "bg-blue-100 text-blue-600"
//               : "bg-gray-100 text-gray-600"
//           }`}
//         >
//           <FiFilter />
//           <span>Filters</span>
//         </button>
//       </div>

//       {showFilters && (
//         <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               From Date
//             </label>
//             <input
//               type="date"
//               value={filters.dateFrom}
//               onChange={(e) =>
//                 setFilters({ ...filters, dateFrom: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               To Date
//             </label>
//             <input
//               type="date"
//               value={filters.dateTo}
//               onChange={(e) =>
//                 setFilters({ ...filters, dateTo: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               value={filters.category}
//               onChange={(e) =>
//                 setFilters({ ...filters, category: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ExpenseTable = ({ filteredExpenses, categories, onEdit, onDelete }) => {
//   const formatDate = (dateString) => {
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   const getPaymentMethodIcon = (method) => {
//     switch (method) {
//       case "Cash":
//         return <MdPayments className="text-green-500" />;
//       case "Bank":
//         return <MdOutlineAccountBalance className="text-blue-500" />;
//       default:
//         return <MdOutlineAttachMoney />;
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Notes
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredExpenses.length > 0 ? (
//               filteredExpenses.map((expense, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {formatDate(expense.date)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         expense.category === "Rent"
//                           ? "bg-blue-100 text-blue-800"
//                           : expense.category === "Inventory"
//                           ? "bg-green-100 text-green-800"
//                           : expense.category === "Utilities"
//                           ? "bg-purple-100 text-purple-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {expense.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     {formatCurrency(expense.amount)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex items-center gap-2">
//                       {getPaymentMethodIcon(expense.paidBy)}
//                       {expense.paidBy}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                     {expense.notes}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button
//                       onClick={() => onEdit(index)}
//                       className="text-blue-600 hover:text-blue-900 mr-3"
//                     >
//                       <FiEdit />
//                     </button>
//                     <button
//                       onClick={() => onDelete(index)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="px-6 py-4 text-center text-sm text-gray-500"
//                 >
//                   No expenses found matching your criteria
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

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
//     paidBy: "",
//     notes: "",
//   });

//   useEffect(() => {
//     if (expense) {
//       setFormData({
//         date: expense.date || "",
//         category: expense.category || "",
//         amount: expense.amount || "",
//         paidBy: expense.paidBy || "",
//         notes: expense.notes || "",
//       });
//     } else {
//       setFormData({
//         date: new Date().toISOString().split("T")[0],
//         category: "",
//         amount: "",
//         paidBy: "",
//         notes: "",
//       });
//     }
//   }, [expense]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       amount: parseFloat(formData.amount),
//     });
//     onClose();
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
//                   name="paidBy"
//                   value={formData.paidBy}
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

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 {expense ? "Update" : "Add"} Expense
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExpensesPage = () => {
//   const [expenses, setExpenses] = useState([
//     {
//       id: 1,
//       date: "2025-06-01",
//       category: "Rent",
//       amount: 5000,
//       paidBy: "Bank",
//       notes: "Monthly shop rent payment",
//     },
//     {
//       id: 2,
//       date: "2025-06-02",
//       category: "Inventory",
//       amount: 2000,
//       paidBy: "Cash",
//       notes: "Purchased rice, oil, and spices",
//     },
//     {
//       id: 3,
//       date: "2025-06-03",
//       category: "Utilities",
//       amount: 800,
//       paidBy: "Cash",
//       notes: "Electricity bill for May 2025",
//     },
//     {
//       id: 4,
//       date: "2025-06-05",
//       category: "Inventory",
//       amount: 1500,
//       paidBy: "Cash",
//       notes: "Bought cleaning supplies",
//     },
//     {
//       id: 5,
//       date: "2025-06-10",
//       category: "Marketing",
//       amount: 3000,
//       paidBy: "Bank",
//       notes: "Facebook ads campaign",
//     },
//   ]);

//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     dateFrom: "",
//     dateTo: "",
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentExpense, setCurrentExpense] = useState(null);

//   const categories = [
//     "Rent",
//     "Inventory",
//     "Utilities",
//     "Marketing",
//     "Salaries",
//     "Maintenance",
//   ];
//   const paymentMethods = ["Cash", "Bank"];

//   const generateId = () => {
//     return Math.max(0, ...expenses.map((e) => e.id)) + 1;
//   };

//   const handleAddExpense = (newExpense) => {
//     setExpenses((prev) => [...prev, { ...newExpense, id: generateId() }]);
//   };

//   const handleEditExpense = (updatedExpense) => {
//     setExpenses((prev) =>
//       prev.map((e) =>
//         e.id === currentExpense.id ? { ...updatedExpense, id: e.id } : e
//       )
//     );
//   };

//   const handleDeleteExpense = (index) => {
//     const expenseToDelete = expenses.filter((e, i) => i === index)[0];
//     if (
//       window.confirm(
//         `Are you sure you want to delete this expense of $${expenseToDelete.amount} for ${expenseToDelete.category}?`
//       )
//     ) {
//       setExpenses((prev) => prev.filter((e, i) => i !== index));
//     }
//   };

//   const handleEditClick = (index) => {
//     setCurrentExpense(expenses[index]);
//     setIsModalOpen(true);
//   };

//   const handleSubmit = (expenseData) => {
//     if (currentExpense) {
//       handleEditExpense(expenseData);
//     } else {
//       handleAddExpense(expenseData);
//     }
//     setCurrentExpense(null);
//   };

//   const filterExpenses = () => {
//     return expenses.filter((expense) => {
//       const matchesSearch = expense.notes
//         .toLowerCase()
//         .includes(filters.search.toLowerCase());
//       const matchesCategory = filters.category
//         ? expense.category === filters.category
//         : true;
//       const matchesDateFrom = filters.dateFrom
//         ? new Date(expense.date) >= new Date(filters.dateFrom)
//         : true;
//       const matchesDateTo = filters.dateTo
//         ? new Date(expense.date) <= new Date(filters.dateTo)
//         : true;

//       return (
//         matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo
//       );
//     });
//   };

//   const handleExport = (format) => {
//     const filteredExpenses = filterExpenses();

//     if (filteredExpenses.length === 0) {
//       alert("No data to export");
//       return;
//     }

//     const exportData = filteredExpenses.map((expense) => ({
//       Date: expense.date,
//       Category: expense.category,
//       Amount: expense.amount,
//       "Payment Method": expense.paidBy,
//       Notes: expense.notes,
//     }));

//     if (format === "excel") {
//       exportToExcel(exportData);
//     } else if (format === "pdf") {
//       exportToPDF(exportData);
//     }
//   };

//   const exportToExcel = (data) => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
//     XLSX.writeFile(
//       workbook,
//       `expenses_${new Date().toISOString().slice(0, 10)}.xlsx`,
//       { compression: true }
//     );
//   };

//   const exportToPDF = (data) => {
//     const doc = new jsPDF();

//     // Title
//     doc.setFontSize(18);
//     doc.text("Expense Report", 105, 15, { align: "center" });

//     // Filters info
//     doc.setFontSize(10);
//     let filterText = "All Expenses";
//     if (filters.dateFrom || filters.dateTo || filters.category) {
//       filterText = "Filtered Expenses: ";
//       if (filters.dateFrom) filterText += `From ${filters.dateFrom} `;
//       if (filters.dateTo) filterText += `To ${filters.dateTo} `;
//       if (filters.category) filterText += `Category: ${filters.category}`;
//     }
//     doc.text(filterText, 105, 25, { align: "center" });

//     // Table
//     const tableData = data.map((item) => [
//       item.Date,
//       item.Category,
//       `$${item.Amount.toFixed(2)}`,
//       item["Payment Method"],
//       item.Notes,
//     ]);

//     autoTable(doc, {
//       head: [["Date", "Category", "Amount", "Payment Method", "Notes"]],
//       body: tableData,
//       startY: 30,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//         valign: "middle",
//       },
//       headStyles: {
//         fillColor: [41, 128, 185],
//         textColor: 255,
//         fontSize: 9,
//       },
//       columnStyles: {
//         0: { cellWidth: 20 },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 20 },
//         3: { cellWidth: 25 },
//         4: { cellWidth: "auto" },
//       },
//     });

//     // Total
//     const totalAmount = data.reduce((sum, item) => sum + item.Amount, 0);
//     doc.setFontSize(10);
//     doc.text(
//       `Total: $${totalAmount.toFixed(2)}`,
//       160,
//       doc.lastAutoTable.finalY + 10
//     );

//     // Save the PDF
//     doc.save(`expenses_${new Date().toISOString().slice(0, 10)}.pdf`);
//   };

//   const ExportButton = () => {
//     const [showOptions, setShowOptions] = useState(false);

//     return (
//       <div className="relative">
//         <button
//           onClick={() => setShowOptions(!showOptions)}
//           className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//         >
//           <FiDownload />
//           <span>Export</span>
//         </button>

//         {showOptions && (
//           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//             <div className="py-1" onMouseLeave={() => setShowOptions(false)}>
//               <button
//                 onClick={() => {
//                   handleExport("excel");
//                   setShowOptions(false);
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Export as Excel
//               </button>
//               <button
//                 onClick={() => {
//                   handleExport("pdf");
//                   setShowOptions(false);
//                 }}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Export as PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const filteredExpenses = filterExpenses();

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//               Expense Tracker
//             </h1>
//             <p className="text-gray-600">
//               Manage your business expenses efficiently
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex gap-3">
//             <ExportButton />
//             <button
//               onClick={() => {
//                 setCurrentExpense(null);
//                 setIsModalOpen(true);
//               }}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               <FiPlus />
//               <span>Add Expense</span>
//             </button>
//           </div>
//         </div>

//         <ExpenseSummaryCards filteredExpenses={filteredExpenses} />
//         <ExpenseFilters
//           filters={filters}
//           setFilters={setFilters}
//           categories={categories}
//         />
//         <ExpenseTable
//           filteredExpenses={filteredExpenses}
//           categories={categories}
//           onEdit={handleEditClick}
//           onDelete={handleDeleteExpense}
//         />

//         <ExpenseModal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setCurrentExpense(null);
//           }}
//           expense={currentExpense}
//           categories={categories}
//           paymentMethods={paymentMethods}
//           onSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default ExpensesPage;
