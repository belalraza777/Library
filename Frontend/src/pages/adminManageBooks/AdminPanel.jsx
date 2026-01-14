// AdminPanel.jsx - Administrative Book Management Panel
// This component provides the interface for administrators to manage the library's book collection,
// allowing them to add new books, edit existing ones, and delete books.
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllBooks, addNewBook, updateBook, deleteBook } from "../../api/books"; // API functions for book operations
import BookTable from "./bookTable"; // Table component to display the list of books
import BookFormModal from "./BookFormModal"; // Modal component to wrap the BookForm for better UX
import SkeletonLoader from "../../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function AdminPanel() {

  // State to hold the list of all books fetched from the backend
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for form input data, used for both adding new books and updating existing ones
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    availableCopies: "",
    totalCopies: "",
    isbn: "",
    image: "",
  });

  // State to store the ID of the book currently being edited; null if adding a new book
  const [editingId, setEditingId] = useState(null);

  // State to control the visibility of the BookFormModal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Asynchronous function to fetch all books from the backend API
  async function fetchBooks() {
    try {
      const res = await getAllBooks();
      if (res.success) setBooks(res.data); // Update the books state if the API call is successful
    }
    catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect hook to fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handles form submission for both adding new books and updating existing ones
  async function handleSubmit(e) {
    e.preventDefault(); // Prevents default form submission behavior

    if (editingId) {
      // If editingId is present, update the existing book
      await updateBook(editingId, form);
      setEditingId(null); // Reset edit mode after update
    } else {
      // If no editingId, add a new book
      await addNewBook(form);
    }
    // Reset form fields to initial empty values after submission
    setForm({
      title: "",
      author: "",
      category: "",
      availableCopies: "",
      totalCopies: "",
      isbn: "",
      image: "",
    });

    fetchBooks(); // Refresh the book list to show the latest changes

    setIsModalOpen(false); // Close the modal after successful submission
  }

  // Handles the deletion of a book by its ID
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
        fetchBooks(); // Refresh the book list
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong while deleting.", "error");
      }
    }
  }

  // Fills the form with selected book data and opens the modal for editing
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
    setEditingId(book._id); // Set the ID of the book being edited

    setIsModalOpen(true); // Open the modal for editing
  }

  // Opens the modal for adding a new book and resets the form
  const handleAddBookClick = () => {
    setEditingId(null); // Ensure no editingId is set for new book creation
    // Reset form fields to empty for a new book entry
    setForm({
      title: "",
      author: "",
      category: "",
      availableCopies: "",
      totalCopies: "",
      isbn: "",
      image: "",
    });
    setIsModalOpen(true); // Open the modal
  };

  // Closes the book form modal and resets editing state
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setEditingId(null); // Reset editingId when closing modal
    // Reset form fields to empty
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

  // Show skeleton loader while fetching data
  if (loading) {
    return (
      // Main container for the admin dashboard (forced dark theme)
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Skeleton for statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SkeletonLoader type="card" count={3} />
          </div>
          {/* Skeleton for tab content */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 border border-gray-700">
            <SkeletonLoader type="card" count={1} />
          </div>
        </div>
      </div>
    )
  }


  return (
    // Main container for the admin panel with styling for background, minimum height, and padding
    <main className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header section for Book Management */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center">
            <i className="fas fa-book mr-3 text-indigo-500"></i>Book Management
          </h1>
          <p className="text-gray-400 text-lg">
            Add, edit, and delete books in your library collection.
          </p>
        </header>

        {/* Add Book Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddBookClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-md"
          >
            <i className="fas fa-plus-circle mr-2"></i> Add New Book
          </button>
        </div>

        {/* Available Books Section */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <i className="fas fa-list-alt mr-2 text-green-500"></i>Available Books
          </h2>
          <BookTable
            books={books}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </div>

      {/* Book Form Modal */}
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
