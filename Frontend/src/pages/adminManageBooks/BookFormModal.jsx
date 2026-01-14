import React from "react";
import Form from "./Form";

export default function BookFormModal({ isOpen, onClose, form, setForm, handleSubmit, editingId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="relative p-8 bg-gray-900 text-white rounded-lg shadow-xl max-w-2xl w-full mx-auto my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <i className="fas fa-times h-6 w-6"></i>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center">
          <i className={editingId ? "fas fa-edit mr-3" : "fas fa-plus-circle mr-3"}></i>
          {editingId ? "Edit Book" : "Add New Book"}
        </h2>

        {/* Form */}
        <Form
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />
      </div>
    </div>
  );
}
