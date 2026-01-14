// BookForm.jsx - Dark themed form for adding or editing book details
import React from "react";

export default function Form({ form, setForm, handleSubmit, editingId }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200"
    >
      {/* Left column */}
      <div className="space-y-4 md:col-span-1">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Book Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300">
            Author
          </label>
          <input
            type="text"
            id="author"
            placeholder="Author Name"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Category (e.g., Fiction, Science)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
        </div>

        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-300">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            placeholder="ISBN (e.g., 978-3-16-148410-0)"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4 md:col-span-1">
        {/* Total Copies */}
        <div>
          <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-300">
            Total Copies
          </label>
          <input
            type="number"
            id="totalCopies"
            placeholder="Total Number of Copies"
            value={form.totalCopies}
            onChange={(e) => setForm({ ...form, totalCopies: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
        </div>

        {/* Available Copies */}
        <div>
          <label htmlFor="availableCopies" className="block text-sm font-medium text-gray-300">
            Available Copies
          </label>
          <input
            type="number"
            id="availableCopies"
            placeholder="Available Copies"
            value={form.availableCopies}
            onChange={(e) => setForm({ ...form, availableCopies: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            placeholder="Book Cover Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="md:col-span-2 mt-6">
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-md shadow-sm text-lg font-medium text-white transition-colors duration-300
            ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </div>
    </form>
  );
}
