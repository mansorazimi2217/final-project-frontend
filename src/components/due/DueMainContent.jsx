import { Search, Frown, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import PayDueModal from "./PayDueModal";
import CustomerCard from "./CustomerCard";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export const Avatar = ({ name }) => (
  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#006EBD] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow">
    {name?.charAt(0)}
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-16 px-4">
    <Frown className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 mb-4" />
    <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-500 text-center">
      No due customers found
    </h3>
    <p className="text-sm sm:text-base text-gray-400 mt-2 text-center">
      All customers are fully paid
    </p>
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

  const handlePayDue = async (
    customerId,
    customerName,
    totalDue,
    returnValue
  ) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/customers/${customerId}`,
        {
          actionType: "payDue",
          totalSpent: returnValue,
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

    try {
      await axios.post(
        "http://localhost:3000/api/duecustomers",
        {
          customerId,
          customerName,
          totalDue,
          returnValue,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to log due payment.");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm) ||
      customer._id?.toLowerCase().includes(searchLower)
    );
  });

  const totalRemainValue = filteredCustomers.reduce(
    (total, customer) => total + (customer.remainValue || 0),
    0
  );

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center text-base md:text-lg text-red-500 px-4">
          Please log in to view customers
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-[#006EBD]" />
      </div>
    );
  }

  return (
    <div className="min-w-[320px] p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <PayDueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onPay={handlePayDue}
      />

      {/* Summary Card */}
      <div className="group bg-white p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md md:shadow-lg border border-gray-200 hover:shadow-lg md:hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-red-100 text-red-600 p-2 md:p-3 rounded-full">
            <AlertCircle className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Pending Dues Summary
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
              {filteredCustomers.length} customer
              {filteredCustomers.length !== 1 ? "s" : ""} with pending payments
            </p>
            <p className="text-sm md:text-base text-gray-700 mt-1 md:mt-2">
              Total Remaining:{" "}
              <span className="font-bold text-red-600">
                {totalRemainValue.toFixed(2)} AFN
              </span>
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/duecustomers/return"
          className="text-sm md:text-base px-4 py-2 md:px-5 md:py-3 bg-[#006EBD] text-white rounded-lg hover:bg-[#117BCE] transition-colors duration-200 shadow-sm font-medium w-full md:w-auto text-center"
        >
          View Return Dues
        </Link>
      </div>

      {/* Search and Refresh */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="relative w-full md:flex-1 max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, phone or ID..."
            className="block w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 rounded-lg border-0 bg-white shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#006EBD] focus:outline-none text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 md:px-5 md:py-3 rounded-lg flex items-center gap-2 text-sm md:text-base text-gray-700 w-full md:w-auto justify-center"
          onClick={() => setRefresh((prev) => !prev)}
        >
          <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
          Refresh
        </button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">
        {filteredCustomers.length === 0 ? (
          <EmptyState />
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer._id} className="w-full">
              <CustomerCard
                customer={customer}
                onPayDue={() => {
                  setSelectedCustomer(customer);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
