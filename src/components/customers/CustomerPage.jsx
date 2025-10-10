import React, { useState, useEffect } from "react";
import MobileMenuButtom from "./MobileMenuButtom";
import HeaderButtons from "./HeaderButtons";
import AddCustomerModal from "./AddCustomerModal";
import SearchAndFilter from "./SearchAndFilter";
import MobileFiltersDropdown from "./MobileFiltersDropdown";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
import { useCustomerContext } from "../../hooks/useCustomerContext";
import UpdateCustomerModal from "./UpdateCustomerModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Customers");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { mycustomers, dispatch } = useCustomerContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/customers/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_CUSTOMER", payload: json });
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilter = (f) => {
    setFilter(f);
    setPage(1);
    setShowMobileFilters(false);
  };

  const handlePageChange = (dir) => {
    setPage((p) => (dir === "next" ? p + 1 : Math.max(p - 1, 1)));
  };

  const handleDelete = async (customer) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/${customer._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        dispatch({
          type: "DELETE_CUSTOMER",
          payload: customer._id,
        });
      } else {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const filteredCustomers = mycustomers
    ?.filter((c) => {
      if (filter === "New Customers") return c.totalOrders <= 10;
      if (filter === "Much Spent") return parseFloat(c.totalSpent) > 2000;
      if (filter === "Kabul") return c.address.includes("Kabul");
      return true;
    })
    ?.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  console.log(filteredCustomers);

  const handleAction = (action, customer) => {
    setSelectedCustomer(customer);
    switch (action) {
      case "delete":
        setDeleteModal(true);
        break;
      case "update":
        setUpdateModal(true);
        break;
      case "details":
        setIsDetailsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const getInitials = (name) => {
    const words = name?.trim().split(" ");
    if (words?.length === 1) return words[0][0]?.toUpperCase();
    return (words[0][0] + words[1][0])?.toUpperCase();
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl">
      <MobileMenuButtom
        setShowMobileMenu={setShowMobileMenu}
        showMobileMenu={showMobileMenu}
        setShowModal={setShowModal}
      />

      <HeaderButtons
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        handleFilter={handleFilter}
        filter={filter}
        setShowModal={setShowModal}
      />

      <AddCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        dispatch={dispatch}
      />

      <UpdateCustomerModal
        showModal={updateModal}
        setShowModal={setUpdateModal}
        customer={selectedCustomer}
        dispatch={dispatch}
      />

      <DeleteConfirmationModal
        showModal={deleteModal}
        setShowModal={setDeleteModal}
        customer={selectedCustomer}
        handleDelete={handleDelete}
      />

      <CustomerDetailsModal
        customer={selectedCustomer}
        onClose={() => setIsDetailsModalOpen(false)}
        isOpen={isDetailsModalOpen}
      />

      <SearchAndFilter
        setShowMobileFilters={setShowMobileFilters}
        showMobileFilters={showMobileFilters}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <MobileFiltersDropdown
        showMobileFilters={showMobileFilters}
        filter={filter}
        handleFilter={handleFilter}
      />

      <CustomerTable
        filteredCustomers={filteredCustomers}
        page={page}
        getInitials={getInitials}
        setDropdownIndex={setDropdownIndex}
        dropdownIndex={dropdownIndex}
        handleAction={handleAction}
      />

      <Pagination
        handlePageChange={handlePageChange}
        page={page}
        filteredCustomers={filteredCustomers}
      />
    </div>
  );
}
