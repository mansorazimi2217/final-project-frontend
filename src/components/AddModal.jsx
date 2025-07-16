import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Image as ImageIcon, CheckCircle } from "lucide-react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsForm from "./ProductsForm";

const AddModal = ({ setAddModal }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  // Form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [comeDate, setComeDate] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [currency, setCurrency] = useState("AFG");

  // Error handling
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [priceError, setPriceError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setBrand("");
    setQuantity("");
    setCategory("");
    setDesc("");
    setBuyPrice("");
    setSellingPrice("");
    setComeDate("");
    setExpireDate("");
    setImg(null);
    setImgPreview(null);
    setEmptyFields([]);
    setError(null);
    setPriceError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setPriceError(null);

    // Validate prices
    if (
      buyPrice &&
      sellingPrice &&
      parseFloat(buyPrice) >= parseFloat(sellingPrice)
    ) {
      setPriceError("Buy price must be smaller than selling price");
      setIsSubmitting(false);
      return;
    }

    if (!user) {
      setError("You must be logged in");
      setIsSubmitting(false);
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
    if (img) {
      formData.append("productImage", img);
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        // Handle duplicate product error
        if (json.error?.includes("already exists")) {
          setError("A product with this name already exists");
          setEmptyFields(["name"]);
        } else {
          setError(json.error || "Failed to add product");
          setEmptyFields(json.emptyFields || []);
        }
        setIsSubmitting(false);
        return;
      }

      // Reset form
      resetForm();
      dispatch({ type: "CREATE_PRODUCT", payload: json });

      // Show success state
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      // Show toast notification
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      setError("An error occurred while adding the product");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
          layout
        >
          {/* Success overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-green-50/90 z-20 flex flex-col items-center justify-center gap-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-2xl font-bold text-green-700">
                Product Added Successfully!
              </h3>
              <p className="text-green-600">
                You can now add another product or close this window
              </p>
            </div>
          )}

          <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <Plus size={24} /> Add New Product
            </h2>
            <button
              className="text-gray-500 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100"
              onClick={() => setAddModal(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <ProductsForm
              error={error}
              emptyFields={emptyFields}
              priceError={priceError}
              setPriceError={setPriceError}
              handleSubmit={handleSubmit}
              name={name}
              brand={brand}
              category={category}
              quantity={quantity}
              handleImageChange={handleImageChange}
              buyPrice={buyPrice}
              sellingPrice={sellingPrice}
              comeDate={comeDate}
              expireDate={expireDate}
              desc={desc}
              setName={setName}
              setBrand={setBrand}
              setCategory={setCategory}
              setQuantity={setQuantity}
              setBuyPrice={setBuyPrice}
              setSellingPrice={setSellingPrice}
              setComeDate={setComeDate}
              setExpireDate={setExpireDate}
              setDesc={setDesc}
              imgPreview={imgPreview}
              isSubmitting={isSubmitting}
              setAddModal={setAddModal}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddModal;
