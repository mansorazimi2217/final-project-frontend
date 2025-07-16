import React from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Calendar,
  Tag,
  Box,
  Bookmark,
  Info,
} from "lucide-react";

function ProductsForm({
  error,
  emptyFields,
  priceError,
  isSubmitting,
  setPriceError,
  imgPreview,
  handleSubmit,
  name,
  brand,
  category,
  quantity,
  handleImageChange,
  buyPrice,
  sellingPrice,
  comeDate,
  expireDate,
  desc,
  setName,
  setBrand,
  setCategory,
  setQuantity,
  setBuyPrice,
  setSellingPrice,
  setComeDate,
  setExpireDate,
  setDesc,
  setAddModal,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Tag size={16} /> Product Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emptyFields.includes("name")
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={
                  emptyFields.includes("name")
                    ? "Name is required"
                    : "Enter product name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error?.includes("already exists") && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <Info size={14} /> {error}
                </p>
              )}
            </div>

            {/* Brand */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Bookmark size={16} /> Brand/Company
              </label>
              <input
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emptyFields.includes("brand")
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={
                  emptyFields.includes("brand")
                    ? "Brand is required"
                    : "Enter brand name"
                }
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Box size={16} /> Category{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emptyFields.includes("category")
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  {emptyFields.includes("category")
                    ? "Please select a category"
                    : "Select category"}
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
                <option value="Grocery & Essentials">
                  Grocery & Essentials
                </option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Box size={16} /> Quantity{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emptyFields.includes("quantity")
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={
                  emptyFields.includes("quantity")
                    ? "Quantity is required"
                    : "Enter quantity"
                }
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                min="0"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ImageIcon size={16} /> Product Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  {imgPreview ? (
                    <img
                      src={imgPreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Pricing <span className="text-blue-600">A</span>
                <span className="text-red-500">F</span>
                <span className="text-green-500">G</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Buy Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className={`border pl-8 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        emptyFields.includes("buy_price")
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder={
                        emptyFields.includes("buy_price") ? "Required" : "0.00"
                      }
                      value={buyPrice}
                      onChange={(e) => {
                        setBuyPrice(e.target.value);
                        if (
                          sellingPrice &&
                          parseFloat(e.target.value) >= parseFloat(sellingPrice)
                        ) {
                          setPriceError(
                            "Buy price must be smaller than selling price"
                          );
                        } else {
                          setPriceError(null);
                        }
                      }}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Selling Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className={`border pl-8 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        emptyFields.includes("selling_price")
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder={
                        emptyFields.includes("selling_price")
                          ? "Required"
                          : "0.00"
                      }
                      value={sellingPrice}
                      onChange={(e) => {
                        setSellingPrice(e.target.value);
                        if (
                          buyPrice &&
                          parseFloat(e.target.value) <= parseFloat(buyPrice)
                        ) {
                          setPriceError(
                            "Buy price must be smaller than selling price"
                          );
                        } else {
                          setPriceError(null);
                        }
                      }}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
              {priceError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <Info size={14} /> {priceError}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={16} /> Production Date{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    emptyFields.includes("come_date")
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  value={comeDate}
                  onChange={(e) => setComeDate(e.target.value)}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={16} /> Expiry Date
                </label>
                <input
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    emptyFields.includes("expire_date")
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Info size={16} /> Description
              </label>
              <textarea
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emptyFields.includes("desc")
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={
                  emptyFields.includes("desc")
                    ? "Description is required"
                    : "Enter product description"
                }
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setAddModal(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <Plus size={18} /> Add Product
              </>
            )}
          </button>
        </div>

        {error && !error.includes("already exists") && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <Info size={16} /> {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductsForm;
