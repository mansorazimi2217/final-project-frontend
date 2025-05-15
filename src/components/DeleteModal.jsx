import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function DeleteModal({ deleteModal, setDeleteModal, setProducts, products }) {
  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:3000/api/products/" + deleteModal._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      setProducts({ type: "DELETE_PRODUCT", payload: json });
      setDeleteModal(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => setDeleteModal(null)}
              >
                <X />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Delete Product
              </h2>
              <p className="mb-4 text-gray-700">
                Are you sure you want to delete{" "}
                <strong>{deleteModal.name}</strong>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DeleteModal;
