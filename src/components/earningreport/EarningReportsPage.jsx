import React, { useState, useMemo, useEffect } from "react";
import {
  FileDown,
  FileText,
  ShoppingCart,
  BadgeDollarSign,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuthContext } from "../../hooks/useAuthContext";

// Format date to human readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EarningReport() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    customer: "",
    product: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [reportRows, setReportRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bills/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReportRows(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      customer: "",
      product: "",
    });
  };

  // Check if any filter is active
  const isFilterActive = Object.values(filters).some((value) => value !== "");

  // Flatten the data
  const flattenedRows = useMemo(() => {
    return reportRows.flatMap((row) =>
      row.products.map((product) => ({
        id: row._id,
        date: row.date,
        customer: row.customerName,
        product: product.name,
        quantity: product.quantity,
        pricePerUnit: product.price,
        costPerUnit: product.buyPrice,
        total: product.total,
      }))
    );
  }, [reportRows]);

  // Filter and sort data
  const filteredRows = useMemo(() => {
    let result = [...flattenedRows];

    // Apply filters
    result = result.filter((row) => {
      const rowDate = new Date(row.date);
      const from = filters.fromDate ? new Date(filters.fromDate) : null;
      const to = filters.toDate ? new Date(filters.toDate) : null;

      return (
        (!from || rowDate >= from) &&
        (!to || rowDate <= to) &&
        (!filters.customer ||
          row.customer
            .toLowerCase()
            .includes(filters.customer.toLowerCase())) &&
        (!filters.product ||
          row.product.toLowerCase().includes(filters.product.toLowerCase()))
      );
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [flattenedRows, filters, sortConfig]);

  // Calculate stats
  const totalEarning = filteredRows.reduce(
    (sum, row) => sum + row.quantity * row.pricePerUnit,
    0
  );
  const totalCost = filteredRows.reduce(
    (sum, row) => sum + row.quantity * row.costPerUnit,
    0
  );
  const totalProfit = totalEarning - totalCost;
  const totalSales = filteredRows.reduce((sum, row) => sum + row.quantity, 0);

  // Count products sold for top product
  const productCount = {};
  filteredRows.forEach((row) => {
    productCount[row.product] = (productCount[row.product] || 0) + row.quantity;
  });
  const topProduct = Object.keys(productCount).reduce(
    (a, b) => (productCount[a] > productCount[b] ? a : b),
    ""
  );

  // Excel Export
  const exportToExcel = () => {
    const table = document.querySelector(".earning-report-table");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Earning Report");
    XLSX.writeFile(wb, "Earning_Report.xlsx");
  };

  // PDF Export with styling
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 110, 189); // #006EBD color
    doc.text("Earnings Report", 105, 20, { align: "center" });

    // Add subtitle
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Detailed analysis of your store's earnings and sales performance",
      105,
      28,
      { align: "center" }
    );

    // Add date
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 35, {
      align: "center",
    });

    // Add stats cards section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Summary Statistics", 14, 50);

    // Get card data
    const cards = [
      {
        icon: "",
        label: "Total Earnings",
        value: `$${totalEarning.toLocaleString()}`,
      },
      {
        icon: "",
        label: "Total Sales",
        value: totalSales.toLocaleString(),
      },
      {
        icon: "",
        label: "Total Profit",
        value: `$${totalProfit.toLocaleString()}`,
      },
      {
        icon: "",
        label: "Top Product",
        value: topProduct || "N/A",
      },
    ];

    // Add cards to PDF (2 columns)
    let yPosition = 60;
    cards.forEach((card, index) => {
      const x = index % 2 === 0 ? 20 : 110;
      if (index % 2 === 0 && index !== 0) yPosition += 30;

      // Card background
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(x, yPosition, 80, 25, 3, 3, "F");

      // Card icon
      doc.setFontSize(14);
      doc.text(card.icon, x + 5, yPosition + 10);

      // Card label
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(card.label, x + 15, yPosition + 10);

      // Card value
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(card.value, x + 5, yPosition + 20);
    });

    // Add table section
    doc.setFontSize(16);
    doc.text("Transaction Details", 14, yPosition + 40);

    // Prepare table data
    const headers = ["Date", "Product", "Quantity", "Customer", "Amount"];

    const rows = filteredRows.map((row) => [
      formatDate(row.date),
      row.product,
      row.quantity,
      row.customer,
      `$${(row.quantity * row.pricePerUnit).toFixed(2)}`,
    ]);

    // Add table to PDF
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: yPosition + 45,
      theme: "grid",
      headStyles: {
        fillColor: [0, 110, 189], // #006EBD color
        textColor: 255,
        fontSize: 10,
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: yPosition + 45 },
      styles: {
        overflow: "linebreak",
        cellWidth: "wrap",
      },
      columnStyles: {
        0: { cellWidth: 30 }, // Date
        1: { cellWidth: 40 }, // Product
        2: { cellWidth: 20 }, // Quantity
        3: { cellWidth: 40 }, // Customer
        4: { cellWidth: 25 }, // Amount
      },
    });
    doc.save("report.pdf");

    // Add footer with total
    if (filteredRows.length > 0) {
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Total: $${totalEarning.toFixed(2)}`, 14, finalY);
      doc.text(`Showing ${filteredRows.length} transactions`, 160, finalY);
    }

    // Save the PDF
    doc.save("Earning_Report.pdf");
  };

  // Request sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006EBD]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white-50 px-4 py-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#006EBD] to-purple-600">
          Earnings Report
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Detailed analysis of your store's earnings and sales performance
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<BadgeDollarSign className="text-[#006EBD] w-6 h-6" />}
            label="Total Earnings"
            value={`${totalEarning.toLocaleString()} AFN`}
            trend="up"
            // percentage="12%"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<ShoppingCart className="text-[#006EBD] w-6 h-6" />}
            label="Total Sales"
            value={totalSales.toLocaleString()}
            trend="up"
            // percentage="8%"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<TrendingUp className="text-[#006EBD] w-6 h-6" />}
            label="Total Profit"
            value={`${totalProfit.toLocaleString()} AFN`}
            trend="down"
            // percentage="15%"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Award className="text-[#006EBD] w-6 h-6" />}
            label="Top Product"
            value={topProduct || "N/A"}
            bgColor="bg-blue-50"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006EBD] focus:border-transparent"
              value={filters.product}
              onChange={(e) =>
                setFilters({ ...filters, product: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {isFilterActive && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition w-full sm:w-auto"
              >
                <FileDown className="w-4 h-4" />
                Excel
              </button>

              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition w-full sm:w-auto"
              >
                <FileText className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition w-full sm:w-auto"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide" : "Show"} Filters
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white rounded-xl shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006EBD] focus:border-transparent"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006EBD] focus:border-transparent"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer
              </label>
              <input
                type="text"
                name="customer"
                value={filters.customer}
                onChange={handleFilterChange}
                placeholder="Filter by customer"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006EBD] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 earning-report-table">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "date",
                    "product",
                    "quantity",
                    "customer",
                    "pricePerUnit",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => requestSort(key)}
                    >
                      <div className="flex items-center">
                        {key === "date" && "Date"}
                        {key === "product" && "Product"}
                        {key === "quantity" && "Quantity"}
                        {key === "customer" && "Customer"}
                        {key === "pricePerUnit" && "Amount"}
                        {getSortIcon(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRows.map((row, index) => (
                  <tr
                    key={row.id + "-" + index}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(row.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {row.product}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-[#006EBD]/10 text-[#006EBD] rounded-full text-xs font-medium">
                        {row.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {row.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {(row.quantity * row.pricePerUnit).toFixed(2)} AFN
                        <div className="text-xs text-gray-400 mt-1">
                          {row.pricePerUnit} × {row.quantity} AFN
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No transactions found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        {filteredRows.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">{filteredRows.length}</span>{" "}
                transactions
              </div>
              <div className="text-sm font-medium text-gray-700">
                Total:{" "}
                <span className="text-[#006EBD]">
                  {totalEarning.toFixed(2)} AFN
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, percentage, bgColor }) {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md stat-card`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-white shadow-xs">{icon}</div>
        <p className="text-sm font-medium text-gray-600 stat-label">{label}</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900 stat-value">{value}</p>
        {trend && percentage && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {percentage}
          </span>
        )}
      </div>
    </div>
  );
}
