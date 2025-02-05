"use client";
import React, { useEffect } from "react";
import Button from "./Shared/Button";

type DeleteModalProps = {
  currency: string;
  onConfirm: (currency: string) => void;
  onCancel: () => void;
};

const DeleteModal = ({ currency, onConfirm, onCancel }: DeleteModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{currency}</strong> from the
          list?
        </p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => onConfirm(currency)}
            className="px-5 py-2.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </Button>
          <Button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
