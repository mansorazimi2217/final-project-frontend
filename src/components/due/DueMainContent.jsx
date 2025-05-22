import { Phone, Mail, Search, Frown, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import PayDueModal from "./PayDueModal";
import CustomerCard from "./CustomerCard";

export const Avatar = ({ name }) => (
  <div className="w-20 h-20 rounded-full bg-[#006EBD] text-white flex items-center justify-center text-3xl font-bold shadow">
    {name?.charAt(0)}
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-12">
    <Frown className="w-16 h-16 text-gray-400 mb-4" />
    <h3 className="text-xl font-medium text-gray-500">
      No due customers found
    </h3>
    <p className="text-gray-400 mt-2">All customers are fully paid</p>
  </div>
);

export default function DueCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "http://localhost:3000/api/customers/",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const dueCustomers = response.data.filter(
          (customer) => (customer.remainValue || 0) > 0
        );

        setCustomers(dueCustomers);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [refresh, user]);

  const handlePayDue = async (customerId, payAmount) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/customers/${customerId}`,
        {
          actionType: "payDue",
          totalSpent: payAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setRefresh((prev) => !prev);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update customer payment."
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm)
    );
  });

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          Please log in to view customers
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#006EBD]" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PayDueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onPay={handlePayDue}
      />

      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl font-bold">Due Customers</h1>
        <div className="text-sm text-gray-500 text-center sm:text-right">
          {filteredCustomers.length} customer
          {filteredCustomers.length !== 1 ? "s" : ""} with pending payments
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="block w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-white shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#006EBD] focus:outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded-lg flex items-center gap-2 text-gray-700 w-full sm:w-auto justify-center"
          onClick={() => setRefresh((prev) => !prev)}
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length === 0 ? (
          <EmptyState />
        ) : (
          filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer._id}
              customer={customer}
              onPayDue={() => {
                setSelectedCustomer(customer);
                setIsModalOpen(true);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
