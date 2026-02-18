// AdminPanel.js
import React, { useEffect, useState, useMemo } from "react";
import { filterBooks } from "../../helpers/filterBooks";
import Swal from "sweetalert2";
import { getAllBooks, addNewBook, updateBook, deleteBook } from "../../api/books";
import BookTable from "./bookTable";
import BookFormModal from "./BookFormModal";
import SkeletonLoader from "../../components/common/skeletonLoader";

export default function AdminPanel() {
  // Store all books
  const [books, setBooks] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Search input state
  const [search, setSearch] = useState("");

  // Form state for add/edit book
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    availableCopies: "",
    totalCopies: "",
    isbn: "",
    image: "",
  });

  // Track which book is being edited
  const [editingId, setEditingId] = useState(null);

  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter books based on search input
  const filteredBooks = useMemo(
    () => filterBooks(books, search),
    [books, search]
  );

  // Fetch all books from API
 async function fetchBooks() {
  try {
    const res = await getAllBooks();
    setBooks(Array.isArray(res) ? res : res.data || []);
  } catch (err) {
    console.log(err);
    setBooks([]);
  } finally {
    setLoading(false);
  }
}

  // Run fetchBooks once when component loads
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle add or update book
  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      // Update book
      await updateBook(editingId, form);
      setEditingId(null);
    } else {
      // Add new book
      await addNewBook(form);
    }

    // Reset form
    setForm({
      title: "",
      author: "",
      category: "",
      availableCopies: "",
      totalCopies: "",
      isbn: "",
      image: "",
    });

    fetchBooks(); // reload books
    setIsModalOpen(false); // close modal
  }

  // Delete book with confirmation
  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id);
        fetchBooks();
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong while deleting.", "error");
      }
    }
  }

  // Open modal and fill form for editing
  function handleEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      category: book.category || "",
      availableCopies: book.availableCopies || "",
      totalCopies: book.totalCopies || "",
      isbn: book.isbn || "",
      image: book.image || "",
    });

    setEditingId(book._id);
    setIsModalOpen(true);
  }

  // Open modal for adding new book
  const handleAddBookClick = () => {
    setEditingId(null);
    setForm({
      title: "",
      author: "",
      category: "",
      availableCopies: "",
      totalCopies: "",
      isbn: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({
      title: "",
      author: "",
      category: "",
      availableCopies: "",
      totalCopies: "",
      isbn: "",
      image: "",
    });
  };

  // Show loading skeleton
  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <div className="container mx-auto p-4">
          <SkeletonLoader type="card" count={3} />
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen p-4 text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-gray-400">
            Add, edit, and delete books.
          </p>
        </header>

        {/* Add book button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddBookClick}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add New Book
          </button>
        </div>

        {/* Book list */}
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl mb-4">Available Books</h2>

          {/* Search input */}
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search by title or author......"
              className="w-full px-3 py-2 rounded text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Book table */}
          <BookTable
            books={filteredBooks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </div>

      {/* Modal for add/edit book */}
      <BookFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />
    </main>
  );
}
