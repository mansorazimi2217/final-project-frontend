import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  FiSearch,
  FiDownload,
  FiFileText,
  FiFile,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { format, parseISO, isValid } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom color theme
const primaryColor = "#006ECE";
const primaryHover = "#005bb7";
const secondaryColor = "#f8fafc";

export default function ReturnDuePage() {
  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 8;

  // Helper function to safely parse and format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, "MMM dd, yyyy") : "Invalid date";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/duecustomers",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setRecords(response.data);
      } catch (err) {
        console.error("Failed to fetch return dues", err);
        toast.error("Failed to load return due records");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    let data = [...records];

    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      data = data.filter((item) => {
        if (!item.date) return false;
        const date = new Date(item.date);
        return date >= start && date <= end;
      });
    }

    setFilteredData(data);
    setCurrentPage(1);
  }, [records, searchTerm, dateRange]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      const headers = [
        "No.",
        "Customer ID",
        "Customer Name",
        "Total Due (AFN)",
        "Return Value (AFN)",
        "Date",
      ];

      const rows = filteredData.map((r, index) => [
        index + 1,
        r.customerId,
        r.customerName || "N/A",
        r.totalDue.toFixed(2),
        r.returnValue.toFixed(2),
        formatDate(r.date),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `return_due_records_${format(new Date(), "yyyyMMdd_HHmm")}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export CSV");
    } finally {
      setIsExporting(false);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTablePlugin = await import("jspdf-autotable");
      const autoTable = autoTablePlugin.default;

      const doc = new jsPDF({ orientation: "landscape" });

      // === Header (Shop Info) ===
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor);
      doc.text(user?.businessName || "My Shop", 14, 15);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(user?.email || "example@email.com", 14, 21);
      if (user?.phone) doc.text(`Phone: ${user.phone}`, 14, 26);

      // === Title ===
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(primaryColor);
      doc.text("Return Due Records", 148, 15, { align: "center" });

      // === Subtitle (Generated Date) ===
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Generated on: ${format(new Date(), "MMM dd, yyyy 'at' hh:mm a")}`,
        148,
        22,
        { align: "center" }
      );

      // === Filters Summary ===
      let filterY = 34;
      filterY += 6;

      // === Table Data ===
      const tableData = filteredData.map((r, i) => [
        i + 1,
        r.customerId,
        r.customerName || "N/A",
        `${parseFloat(r.totalDue).toFixed(2)} AFN`,
        `${parseFloat(r.returnValue).toFixed(2)} AFN`,
        formatDate(r.date),
      ]);

      autoTable(doc, {
        head: [
          [
            "No.",
            "Customer ID",
            "Customer Name",
            "Total Due",
            "Return Value",
            "Date",
          ],
        ],
        body: tableData,
        startY: filterY + 4,
        theme: "striped",
        headStyles: {
          fillColor: primaryColor,
          textColor: "#ffffff",
          fontStyle: "bold",
          halign: "center",
        },
        alternateRowStyles: { fillColor: secondaryColor },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          overflow: "linebreak",
          halign: "center",
        },
        margin: { top: 30, left: 10, right: 10 },
      });

      // === Summary Footer ===
      const totalDue = filteredData.reduce(
        (sum, r) => sum + parseFloat(r.totalDue),
        0
      );
      const totalReturn = filteredData.reduce(
        (sum, r) => sum + parseFloat(r.returnValue),
        0
      );
      const totalRecords = filteredData.length;

      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(11);
      doc.setTextColor(20);
      doc.text(`Total Records: ${totalRecords}`, 14, finalY);
      doc.text(`Total Due: ${totalDue.toFixed(2)} AFN`, 80, finalY);
      doc.text(`Total Return: ${totalReturn.toFixed(2)} AFN`, 160, finalY);

      // === Save File ===
      const fileName = `return_due_records_${format(
        new Date(),
        "yyyy-MM-dd_HH-mm"
      )}.pdf`;
      doc.save(fileName);

      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/duecustomers/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setRecords((prev) => prev.filter((r) => r._id !== id));
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error("Failed to delete record:", error);
      toast.error("Failed to delete record");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDateRange({ start: "", end: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6" style={{ backgroundColor: primaryColor }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Return Due Records
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Manage and track customer return dues
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <button
                onClick={exportCSV}
                disabled={isExporting || filteredData.length === 0}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isExporting || filteredData.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-blue-800 hover:bg-blue-50"
                }`}
              >
                {isExporting ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiFile className="mr-2" />
                )}
                CSV
              </button>
              <button
                onClick={exportPDF}
                disabled={isExporting || filteredData.length === 0}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isExporting || filteredData.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-blue-800 hover:bg-blue-50"
                }`}
              >
                {isExporting ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiFileText className="mr-2" />
                )}
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 sm:p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Customer ID or Name..."
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "2.5rem" }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FiX
                      className="text-gray-400 hover:text-gray-600"
                      size={16}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" size={16} />
                </div>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="pl-10 pr-5 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm h-10"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" size={16} />
                </div>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="pl-10 pr-5 w-full border border-gray-300 rounded-md py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm h-10"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            {/* Actions */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center h-10 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm"
              >
                <FiX className="mr-2" size={16} />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div
                className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
                style={{ borderColor: primaryColor }}
              ></div>
            </div>
          )}

          {/* Table */}
          {!isLoading && (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Due
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Return Value
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-4 text-center text-sm text-gray-500"
                      >
                        {filteredData.length === 0 && records.length > 0
                          ? "No records match your filters"
                          : "No records found"}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div
                              className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: primaryColor }}
                            >
                              {item.customerName?.charAt(0) ||
                                item.customerId.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {item.customerName || "Unnamed Customer"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {item.customerId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                          {/* {formatCurrency(item.totalDue)} AFN */}
                          {item.totalDue} AFN
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {/* {formatCurrency(item.returnValue)} AFN */}
                          {item.returnValue} AFN
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.date)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800 flex items-center space-x-1 transition-colors"
                          >
                            <FiTrash2 className="text-sm" />
                            <span className="text-xs">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                records
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md flex items-center text-sm ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FiChevronLeft className="mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        currentPage === i + 1
                          ? `text-white`
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                      style={
                        currentPage === i + 1
                          ? { backgroundColor: primaryColor }
                          : {}
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md flex items-center text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
