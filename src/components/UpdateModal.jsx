import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useProductsContext } from "../hooks/useProductsContext";

const UpdateModal = ({ setUpdateModal, productToUpdate }) => {
  const { dispatch } = useProductsContext();

  const [name, setName] = useState(productToUpdate.name || "");
  const [brand, setBrand] = useState(productToUpdate.brand || "");
  const [category, setCategory] = useState(productToUpdate.category || "");
  const [desc, setDesc] = useState(productToUpdate.desc || "");
  const [quantity, setQuantity] = useState(productToUpdate.quantity || "");
  const [buyPrice, setBuyPrice] = useState(productToUpdate.buy_price || "");
  const [sellingPrice, setSellingPrice] = useState(
    productToUpdate.selling_price || ""
  );
  const [expireDate, setExpireDate] = useState(
    productToUpdate.expire_date || ""
  );
  const [comeDate, setComeDate] = useState(productToUpdate.come_date || "");
  const [img, setImg] = useState(productToUpdate.img || "");
  const [currency, setCurrency] = useState(productToUpdate.currency || "$");

  const [error, setError] = useState(null);
  const [emptFeilds, setEmptFeilds] = useState([]);

  useEffect(() => {
    setName(productToUpdate.name);
    setBrand(productToUpdate.brand);
    setCategory(productToUpdate.category);
    setDesc(productToUpdate.desc);
    setQuantity(productToUpdate.quantity);
    setBuyPrice(productToUpdate.buy_price);
    setSellingPrice(productToUpdate.selling_price);
    setExpireDate(productToUpdate.expire_date);
    setComeDate(productToUpdate.come_date);
    setImg(productToUpdate.img);
    setCurrency(productToUpdate.currency);
  }, [productToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    formData.append("productImage", img); // If image changed, append it

    const response = await fetch(
      `http://localhost:3000/api/products/${productToUpdate._id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptFeilds(json.emptFeilds);
    }

    if (response.ok) {
      setError(null);
      setEmptFeilds([]);
      setUpdateModal(false);
      dispatch({ type: "UPDATE_PRODUCT", payload: json });
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
        <div className="bg-white rounded-none md:rounded-3xl shadow-2xl w-full h-full md:w-full md:max-w-3xl md:h-auto overflow-y-auto relative p-6">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={() => setUpdateModal(false)}
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-blue-600">
            Update Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <input
              className={"border p-2 rounded-xl"}
              style={{
                backgroundColor: emptFeilds.includes("category") ? "pink" : "",
              }}
              placeholder={
                emptFeilds.includes("category")
                  ? "category is required"
                  : "Category"
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              className={"border p-2 rounded-xl"}
              style={{
                backgroundColor: emptFeilds.includes("quantity") ? "pink" : "",
              }}
              placeholder={
                emptFeilds.includes("quantity")
                  ? "quantity is required"
                  : "Quantity"
              }
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
                className={"border p-2 rounded-xl w-full"}
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
                  className="border border-gray-300 p-2 rounded-xl w-full"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded-xl w-full"
                  placeholder="Buy Price"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                />
                <select
                  className="border border-gray-300 p-2 rounded-xl w-full md:w-40"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="$">$</option>
                  <option value="AFG">AFG</option>
                  <option value="€">€</option>
                  <option value="£">£</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Production Date
              </label>
              <input
                className="border p-2 rounded-xl"
                value={comeDate}
                onChange={(e) => setComeDate(e.target.value)}
                type="date"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Expiry Date
              </label>
              <input
                className="border p-2 rounded-xl"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                type="date"
              />
            </div>

            <textarea
              className="border p-2 rounded-xl md:col-span-2"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#006EBD] hover:bg-[#006ECE] text-white rounded-xl py-2 px-6 mt-8 w-full"
          >
            Update Product
          </button>

          {error && <div className="p-3 bg-red-100">{error}</div>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateModal;
