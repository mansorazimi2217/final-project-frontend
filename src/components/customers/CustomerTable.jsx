import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { ClipboardCopy, Check } from "lucide-react"; // Add Check icon
import { useState } from "react";
function CustomerTable({
  filteredCustomers,
  page,
  getInitials,
  setDropdownIndex,
  dropdownIndex,
  handleAction,
}) {
  function CopyableCustomerId({ id }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    };

    return (
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition group"
        title="Click to copy ID"
      >
        <span className="truncate max-w-[120px] md:max-w-none block text-left">
          {id}
        </span>
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <ClipboardCopy className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
        )}
      </button>
    );
  }

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Phone Number</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">
                Email
              </th>
              <th className="px-3 py-2 text-left hidden md:table-cell">
                Address
              </th>
              <th className="px-3 py-2 text-left">Orders</th>
              <th className="px-3 py-2 text-left">Spent</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers
                .slice((page - 1) * 5, page * 5)
                .map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b relative hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#006EBD] text-white flex items-center justify-center font-medium text-xs md:text-sm">
                        {getInitials(customer.name)}
                      </div>
                      <span className="truncate max-w-[120px] md:max-w-none">
                        {customer.name}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <CopyableCustomerId id={customer._id} />
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="truncate max-w-[120px] md:max-w-none block">
                        {customer.phone}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="truncate max-w-[120px] md:max-w-none block">
                        {customer.email}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      {customer.address}
                    </td>
                    <td className="px-3 py-3">{customer.totalOrders}</td>
                    <td className="px-3 py-3">{customer.totalSpent}</td>
                    <td className="px-3 py-3 relative">
                      <button
                        className="border p-1 rounded-md hover:bg-gray-100"
                        onClick={() =>
                          setDropdownIndex(
                            dropdownIndex === index ? null : index
                          )
                        }
                      >
                        <ChevronDownIcon size={16} />
                      </button>
                      {dropdownIndex === index && (
                        <div className="absolute z-10 right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                          {["details", "update", "delete"].map((action) => (
                            <button
                              key={action}
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => {
                                handleAction(action, customer);
                                setDropdownIndex(null);
                              }}
                            >
                              {action === "details"
                                ? "Show Details"
                                : action.charAt(0).toUpperCase() +
                                  action.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="px-3 py-4 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;
