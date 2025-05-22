import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import Input from "./Input";
import Button from "./Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuthContext } from "../../hooks/useAuthContext";

function MainContentSellPage({
  formData,
  stockError,
  handleAddToCart,
  cartItems,
  handleDeleteClick,
  handleChange,
  totalAmount,
  clearCart,
}) {
  const [totalPaied, setTotalPaied] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [totalPaidError, setTotalPaidError] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerType, setCustomerType] = useState("temporary");
  const [searchTerm, setSearchTerm] = useState("");
  const [tempCustomerName, setTempCustomerName] =
    useState("Temporary Customer");

  const navigate = useNavigate();

  const { user } = useAuthContext();
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/customers/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    fetchCustomers();
  }, [user]);

  useEffect(() => {
    const customer = customers.find((cust) => cust._id === selectedCustomerId);
    if (customer) {
      console.log(customer._id + "  check this");
    }
    setSelectedCustomer(customer || null);
  }, [selectedCustomerId, customers]);

  useEffect(() => {
    if (customerType === "temporary") {
      setTotalPaied(totalAmount.toString());
    } else {
      setTotalPaied("");
    }
  }, [customerType, totalAmount]);

  const handleTotalPaidChange = (e) => {
    const value = e.target.value;
    setTotalPaied(value);
    setTotalPaidError(
      Number(value) > totalAmount
        ? "Total paid can't be more than total price."
        : ""
    );
  };

  const updateCustomerStats = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/${customerId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actionType: "sale", // Explicitly specify this is a sale
            totalSpent: Number(totalPaied),
            remainValue: Number(totalAmount) - Number(totalPaied),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update customer stats");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  };

  // const updateCustomerStats = async (customerId) => {
  //   try {
  //     await fetch(`http://localhost:3000/api/customers/${customerId}`, {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         totalSpent: Number(totalPaied),
  //         remainVale: Number(totalAmount) - Number(totalPaied),
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Error updating customer:", error);
  //     throw error;
  //   }
  // };

  const generatePDF = ({
    cartItems,
    totalAmount,
    totalPaied,
    selectedCustomer,
    tempCustomerName,
    customerType,
  }) => {
    const doc = new jsPDF();

    let email = "store@example.com";
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        email = user.businessName || email;
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    }

    const storeName = email;

    const customerName =
      customerType === "permanent" ? selectedCustomer?.name : tempCustomerName;

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(storeName.toUpperCase(), 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Sales Receipt", 105, 30, { align: "center" });

    doc.setDrawColor(100);
    doc.line(14, 35, 196, 35);
    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 52);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, 59);
    doc.text(`Paid: $${Number(totalPaied).toFixed(2)}`, 14, 66);
    doc.text(
      `Remaining: $${(totalAmount - Number(totalPaied)).toFixed(2)}`,
      14,
      73
    );

    autoTable(doc, {
      head: [["Product ID", "Name", "Qty", "Price", "Total"]],
      body: cartItems.map((item) => [
        item.id,
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${item.total.toFixed(2)}`,
      ]),
      startY: 80,
      styles: { halign: "center", fontSize: 10 },
      headStyles: {
        fillColor: [0, 110, 189],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 10, left: 14, right: 14 },
    });

    doc.save(`receipt_${Date.now()}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("🛒 Please add products to the cart before purchasing.");
      return;
    }

    if (
      (customerType === "permanent" && (!selectedCustomer || !totalPaied)) ||
      (customerType === "temporary" && !tempCustomerName)
    ) {
      alert("👤 Please select a customer and enter valid payment details.");
      return;
    }

    if (totalPaidError) {
      alert("❌ Please fix the total paid amount.");
      return;
    }

    try {
      const billPayload = {
        customerId:
          customerType === "permanent" ? selectedCustomer?._id : "temporary",
        total: totalAmount,
        totalPaied: Number(totalPaied),
        customerName:
          customerType === "permanent"
            ? selectedCustomer?.name
            : tempCustomerName,
        sendToBills: customerType === "permanent",
        date: new Date().toISOString(),
        products: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          image: item.image,
        })),
      };

      const billResponse = await fetch("http://localhost:3000/api/bills/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billPayload),
      });

      if (!billResponse.ok)
        throw new Error(`HTTP error! status: ${billResponse.status}`);

      if (customerType === "permanent" && selectedCustomerId) {
        await updateCustomerStats(selectedCustomerId);
      }

      for (let item of cartItems) {
        const updateRes = await fetch(
          `http://localhost:3000/api/products/${item.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ soldQuantity: item.quantity }),
          }
        );

        if (!updateRes.ok) {
          throw new Error(`Failed to update stock for product ID ${item.id}`);
        }
      }

      generatePDF({
        cartItems,
        totalAmount,
        totalPaied,
        selectedCustomer,
        tempCustomerName,
        customerType,
      });

      alert("✅ Products sold and stock updated successfully!");
      setSelectedCustomerId("");
      setSelectedCustomer(null);
      setTempCustomerName("");
      setTotalPaied("");
      clearCart();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong while saving the sale or updating stock.");
    }
  };

  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="border p-4 md:p-6 rounded-lg space-y-6 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Sell Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Product ID" name="id" value={formData.id} readOnly />
          <Input
            label="Price Per Unit"
            name="price"
            value={formData.price}
            readOnly
          />
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            readOnly
          />
          <div>
            <Input
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            {stockError && (
              <div className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertTriangle className="mr-1" /> {stockError}
              </div>
            )}
          </div>
          <Input
            label="Company Name"
            name="company"
            value={formData.company}
            readOnly
          />
          <Input
            label="Total Price"
            name="total"
            value={formData.total}
            readOnly
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleAddToCart}>Add To Cart</Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Product ID</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">${item.price}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.company}</td>
                    <td className="p-3">${item.total}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="customerType"
              value="permanent"
              checked={customerType === "permanent"}
              onChange={(e) => setCustomerType(e.target.value)}
            />
            <span>Permanent Customer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="customerType"
              value="temporary"
              checked={customerType === "temporary"}
              onChange={(e) => setCustomerType(e.target.value)}
            />
            <span>Guest Customer</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customerType === "permanent" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Customer
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) =>
                  e.target.value === "add_new"
                    ? navigate("/dashboard/customers")
                    : setSelectedCustomerId(e.target.value)
                }
                className="w-full border rounded-md px-3 py-2 focus:outline-none"
              >
                <option value="">Select a customer</option>
                {filteredCustomers.map((cust) => (
                  <option key={cust._id} value={cust._id}>
                    {cust.name} , ({cust.email}) , {cust.phone} , {cust._id}
                  </option>
                ))}
                <option value="add_new">➕ Add New Customer</option>
              </select>
            </div>
          ) : (
            <Input
              label="Customer Name"
              placeholder="Enter customer name"
              value={tempCustomerName}
              onChange={(e) => setTempCustomerName(e.target.value)}
            />
          )}

          <div>
            <Input
              label="Total Paid"
              placeholder="Enter total paid"
              value={totalPaied}
              onChange={handleTotalPaidChange}
              readOnly={customerType === "temporary"}
            />
            {totalPaidError && (
              <p className="text-sm text-red-500 mt-1">{totalPaidError}</p>
            )}
          </div>
        </div>

        {customerType === "permanent" && selectedCustomer && (
          <div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold text-gray-700 mb-2">Customer Info</h4>
            <p className="text-sm text-gray-600">
              📧 <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p className="text-sm text-gray-600">
              🏠 <strong>Address:</strong> {selectedCustomer.address}
            </p>
            <p className="text-sm text-gray-600">
              💰 <strong>Total Spent:</strong>{" "}
              {selectedCustomer.totalSpent || 0}
            </p>
            <p className="text-sm text-gray-600">
              🛒 <strong>Total Orders:</strong>{" "}
              {selectedCustomer.totalOrders || 0}
            </p>
            <p className="text-sm text-gray-600">
              💸 <strong>Remain Value :</strong>{" "}
              {selectedCustomer.remainValue || 0}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-800">
            Total: {totalAmount.toFixed(2)}
          </div>
          <Button onClick={handleSubmit}>Purchase</Button>
        </div>
      </div>
    </div>
  );
}

export default MainContentSellPage;
