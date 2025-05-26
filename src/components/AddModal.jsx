import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddModal = ({ setAddModal }) => {
  const { dispatch } = useProductsContext();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setByPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [comeDate, setComeDate] = useState("");
  const [img, setImg] = useState("");
  const [currency, setCurrency] = useState("$");

  const [error, setError] = useState(null);
  const [emptFeilds, setEmptFeilds] = useState([]);

  const { user } = useAuthContext();

  const hundleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you most be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("desc", desc);
    formData.append("quantity", quantity);
    formData.append("buy_price", buyPrice);
    formData.append("selling_price", sellingPrice);
    formData.append("currency", currency);
    formData.append("expire_date", expireDate);
    formData.append("come_date", comeDate);
    formData.append("productImage", img);

    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptFeilds(json.emptFeilds || []);
    }

    if (response.ok) {
      setError(null);
      setEmptFeilds([]);
      setName("");
      setBrand("");
      setQuantity("");
      setCategory("");
      setDesc("");
      setByPrice("");
      setSellingPrice("");
      setComeDate("");
      setExpireDate("");
      setImg(null);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <div
          className="bg-white rounded-none md:rounded-3xl shadow-2xl 
                     w-full h-full md:w-full md:max-w-3xl md:h-auto 
                     overflow-y-auto relative p-6"
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={() => setAddModal(false)}
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-blue-600">
            Add New Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <input
                className={"border p-2 rounded-xl w-full"}
                style={{
                  backgroundColor: emptFeilds.includes("name") ? "pink" : "",
                }}
                placeholder={
                  emptFeilds.includes("name") ? "name is required" : "Name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <select
              className="border border-red-500 p-2 rounded-xl"
              style={{
                backgroundColor: emptFeilds.includes("category") ? "pink" : "",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                {emptFeilds.includes("category")
                  ? "Category is required"
                  : "Select Category"}
              </option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Electronics & Gadgets">
                Electronics & Gadgets
              </option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Health & Personal Care">
                Health & Personal Care
              </option>
              <option value="Baby & Kids">Baby & Kids</option>
              <option value="Automotive">Automotive</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="Arts, Crafts & Stationery">
                Arts, Crafts & Stationery
              </option>
              <option value="Books & Media">Books & Media</option>
              <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
              <option value="Furniture">Furniture</option>
              <option value="Tools & Industrial">Tools & Industrial</option>
              <option value="Travel & Outdoors">Travel & Outdoors</option>
              <option value="Jewelry & Accessories">
                Jewelry & Accessories
              </option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Grocery & Essentials">Grocery & Essentials</option>
              <option value="Footwear">Footwear</option>
            </select>

            {/* <input
              className={"border border-red-500 p-2 rounded-xl"}
              placeholder={
                emptFeilds.includes("category")
                  ? "category is required"
                  : "Catogery"
              }
              style={{
                backgroundColor: emptFeilds.includes("category") ? "pink" : "",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}

            <input
              className={"border p-2 rounded-xl"}
              // placeholder="Stock"
              placeholder={
                emptFeilds.includes("quantity")
                  ? "quantity is required"
                  : "Quantity"
              }
              style={{
                backgroundColor: emptFeilds.includes("quantity") ? "pink" : "",
              }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />

            <input
              className="border p-2 rounded-xl"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />

            <div className="col-span-1 md:col-span-2">
              <input
                className={"border  p-2 rounded-xl w-full"}
                placeholder={
                  emptFeilds.includes("brand")
                    ? "Company is required"
                    : "Company"
                }
                style={{
                  backgroundColor: emptFeilds.includes("brand") ? "pink" : "",
                }}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pricing
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  className={
                    "border border-gray-300 p-2  rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                  // placeholder="Selling Price"
                  placeholder={
                    emptFeilds.includes("selling_price")
                      ? "Selling price is required"
                      : "Selling Price"
                  }
                  style={{
                    backgroundColor: emptFeilds.includes("selling_price")
                      ? "pink"
                      : "",
                  }}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                />

                <input
                  type="number"
                  className={
                    "border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                  // placeholder="Buy Price"
                  placeholder={
                    emptFeilds.includes("buy_price")
                      ? "Buy Price is required"
                      : "Buy Price"
                  }
                  style={{
                    backgroundColor: emptFeilds.includes("buy_price")
                      ? "pink"
                      : "",
                  }}
                  value={buyPrice}
                  onChange={(e) => setByPrice(e.target.value)}
                />

                {/* Currency Selector */}
                <select
                  className="border border-gray-300 p-2 rounded-xl w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="$">$</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Production Date
              </label>
              <input
                className={"border  p-2 rounded-xl"}
                value={comeDate}
                onChange={(e) => setComeDate(e.target.value)}
                type="date"
                style={{
                  backgroundColor: emptFeilds.includes("come_date")
                    ? "pink"
                    : "",
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Expiry Date
              </label>
              <input
                className="border  p-2 rounded-xl"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                type="date"
                style={{
                  backgroundColor: emptFeilds.includes("expire_date")
                    ? "pink"
                    : "",
                }}
              />
            </div>

            <textarea
              className="border p-2 rounded-xl md:col-span-2"
              // className="border p-2 rounded-xl md:col-span-2"
              // placeholder="Description"
              placeholder={
                emptFeilds.includes("desc")
                  ? "Description is required"
                  : "Description"
              }
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              style={{
                backgroundColor: emptFeilds.includes("desc") ? "pink" : "",
              }}
            />
          </div>

          <button
            onClick={hundleSubmit}
            className="bg-[#006EBD] hover:bg-blue-700 text-white rounded-xl py-2 px-6 mt-8 w-full"
            style={{ marginTop: "25px" }}
          >
            Add Product
          </button>

          {error && <div className="p-3 bg-red-100">{error}</div>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddModal;
