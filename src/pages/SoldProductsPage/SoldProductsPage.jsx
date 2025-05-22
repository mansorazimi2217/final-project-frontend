import { useState, useEffect } from "react";
import MainLayout from "../../components/soldpage/layout/MainLayout";
import SalesHeader from "../../components/soldpage/SalesHeader";
import SalesFilters from "../../components/soldpage/SalesFilters";
import SalesTable from "../../components/soldpage/SalesTable";
import SalesEmptyState from "../../components/soldpage/SalesEmptyState";
import SalesLoading from "../../components/soldpage/SalesLoading";
import SalesError from "../../components/soldpage/SalesError";
import { useAuthContext } from "../../hooks/useAuthContext";

function SoldProductsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    customerName: "",
    productName: "",
    date: "",
  });
  const [dateFilter, setDateFilter] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const fetchBills = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/bills/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }
        const data = await response.json();
        setBills(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchBills();
  }, [user]);

  const handleSearch = () => {
    let filteredBills = [...bills];

    if (searchQuery) {
      filteredBills = filteredBills.filter(
        (bill) =>
          bill.customerName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          bill.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bill.products?.some((product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (filters.customerName) {
      filteredBills = filteredBills.filter((bill) =>
        bill.customerName
          ?.toLowerCase()
          .includes(filters.customerName.toLowerCase())
      );
    }

    if (filters.productName) {
      filteredBills = filteredBills.filter((bill) =>
        bill.products?.some((product) =>
          product.name
            ?.toLowerCase()
            .includes(filters.productName.toLowerCase())
        )
      );
    }

    if (dateFilter) {
      filteredBills = filteredBills.filter(
        (bill) => new Date(bill.date).toISOString().split("T")[0] === dateFilter
      );
    }

    return filteredBills;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("");
    setFilters({ customerName: "", productName: "", date: "" });
  };

  const filteredBills = handleSearch();
  console.log("filted : " + filteredBills);
  const totalSales = filteredBills.reduce(
    (sum, bill) => sum + (bill.totalPaied || 0),
    0
  );

  if (loading) return <SalesLoading />;
  if (error) return <SalesError error={error} />;

  return (
    <MainLayout>
      <SalesHeader totalSales={totalSales} />

      <SalesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {filteredBills.length === 0 ? (
        <SalesEmptyState
          searchQuery={searchQuery}
          dateFilter={dateFilter}
          clearFilters={clearFilters}
        />
      ) : (
        <SalesTable bills={filteredBills} />
      )}
    </MainLayout>
  );
}

export default SoldProductsPage;
