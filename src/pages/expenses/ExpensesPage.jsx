import React, { useState, useEffect } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

import ExpenseSummaryCards from "../../components/expenses/ExpenseSummaryCards";
import ExpenseFilters from "../../components/expenses/ExpenseFilters";
import ExpenseTable from "../../components/expenses/ExpenseTable";
import ExpenseModal from "../../components/expenses/ExpenseModal";
import { useAuthContext } from "../../hooks/useAuthContext";

const ExpensesPage = (isSidebarOpen) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/expenses", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  const filterExpenses = () => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.notes
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory = filters.category
        ? expense.category === filters.category
        : true;
      const matchesDateFrom = filters.dateFrom
        ? new Date(expense.date) >= new Date(filters.dateFrom)
        : true;
      const matchesDateTo = filters.dateTo
        ? new Date(expense.date) <= new Date(filters.dateTo)
        : true;

      return (
        matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo
      );
    });
  };

  const filteredExpenses = filterExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const categories = ["Rent", "Utilities", "Marketing", "Salaries"];
  const paymentMethods = ["Cash", "Bank"];

  const generateId = () => {
    return Math.max(0, ...expenses.map((e) => e.id)) + 1;
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, { ...newExpense, id: generateId() }]);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === currentExpense.id ? { ...updatedExpense, id: e.id } : e
      )
    );
  };
  const handleDeleteExpense = async (index) => {
    const expenseToDelete = expenses[index];

    const confirmed = window.confirm(
      `Are you sure you want to delete this expense of $${expenseToDelete.amount} for ${expenseToDelete.category}?`
    );
    if (!confirmed) return;

    try {
      // Call the DELETE API
      await axios.delete(
        `http://localhost:3000/api/expenses/${expenseToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update local state after successful delete
      setExpenses((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense. Please try again.");
    }
  };

  const handleEditClick = (index) => {
    setCurrentExpense(expenses[index]);
    setIsModalOpen(true);
  };

  const handleSubmit = (expenseData) => {
    if (currentExpense) {
      handleEditExpense(expenseData);
    } else {
      handleAddExpense(expenseData);
    }
    setCurrentExpense(null);
  };

  const handleExport = (format) => {
    const filtered = filteredExpenses;

    if (filtered.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData = filtered.map((expense) => ({
      Date: expense.date,
      Category: expense.category,
      Amount: expense.amount,
      "Payment Method": expense.paidBy,
      Notes: expense.notes,
    }));

    if (format === "excel") {
      exportToExcel(exportData);
    } else if (format === "pdf") {
      exportToPDF(exportData);
    }
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(
      workbook,
      `expenses_${new Date().toISOString().slice(0, 10)}.xlsx`,
      { compression: true }
    );
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Report", 105, 15, { align: "center" });

    doc.setFontSize(10);
    let filterText = "All Expenses";
    if (filters.dateFrom || filters.dateTo || filters.category) {
      filterText = "Filtered Expenses: ";
      if (filters.dateFrom) filterText += `From ${filters.dateFrom} `;
      if (filters.dateTo) filterText += `To ${filters.dateTo} `;
      if (filters.category) filterText += `Category: ${filters.category}`;
    }
    doc.text(filterText, 105, 25, { align: "center" });

    const tableData = data.map((item) => [
      item.Date,
      item.Category,
      `$${item.Amount.toFixed(2)}`,
      item["Payment Method"],
      item.Notes,
    ]);

    autoTable(doc, {
      head: [["Date", "Category", "Amount", "Payment Method", "Notes"]],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: "middle",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: "auto" },
      },
    });

    const totalAmount = data.reduce((sum, item) => sum + item.Amount, 0);
    doc.setFontSize(10);
    doc.text(
      `Total: $${totalAmount.toFixed(2)}`,
      160,
      doc.lastAutoTable.finalY + 10
    );
    doc.save(`expenses_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const ExportButton = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          <FiDownload />
          <span>Export</span>
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="py-1" onMouseLeave={() => setShowOptions(false)}>
              <button
                onClick={() => {
                  handleExport("excel");
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as Excel
              </button>
              <button
                onClick={() => {
                  handleExport("pdf");
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 `}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Expense Tracker
            </h1>
            <p className="text-gray-600">
              Manage your business expenses efficiently
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <ExportButton />
            <button
              onClick={() => {
                setCurrentExpense(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#006EBD] text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading expenses...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <ExpenseFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />

            <ExpenseSummaryCards filteredExpenses={filteredExpenses} />
            <ExpenseTable
              filteredExpenses={filteredExpenses}
              categories={categories}
              onEdit={handleEditClick}
              onDelete={handleDeleteExpense}
            />
          </>
        )}

        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentExpense(null);
          }}
          expense={currentExpense}
          categories={categories}
          paymentMethods={paymentMethods}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
