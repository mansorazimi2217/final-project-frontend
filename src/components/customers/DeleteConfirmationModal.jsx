import React from "react";

export default function DeleteConfirmationModal({
  showModal,
  setShowModal,
  customer,
  handleDelete,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete {customer?.name}? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(customer);
              setShowModal(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
