import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";
function DeleteModal({ showDeleteModal, setShowDeleteModal, confirmDelete }) {
  return (
    <div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <FiAlertTriangle className="text-red-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item from your order?
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModal;
