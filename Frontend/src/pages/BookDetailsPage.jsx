// BookDetailsPage.jsx
import { useParams } from "react-router-dom";
import { getBookById } from "../api/books";
import { useEffect, useState } from "react";
import BorrowBtn from "../components/buttons/borrowBtn";
import SkeletonLoader from "../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchBook(bookId) {
    try {
      const response = await getBookById(bookId);
      setBook(response.data);
    } catch (err) {
      console.error("Failed to fetch book:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  //loader
  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-screen">
        {/* Use SkeletonLoader with 'details' type */}
        <SkeletonLoader type="details" />
      </div>
    );
  }

  // Show message if book not found
  if (!book) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 text-xl py-10">
        Book not found
      </p>
    );
  }

  // Show actual book details
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <div className="bg-bg-gray-800 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex flex-col md:flex-row">
        {/* Book image */}
        <div className="md:w-1/3 lg:w-1/4 p-4 flex justify-center items-center bg-gray-700 dark:bg-gray-700">
          <img
            className="w-full h-auto object-contain max-h-96 rounded-lg shadow-md"
            src={book.image}
            alt={`Cover of ${book.title}`}
          />
        </div>

        {/* Book details */}
        <div className="p-6 flex flex-col justify-between md:w-2/3 lg:w-3/4">
          <div>
            <h1 className="text-4xl font-extrabold text-white dark:text-white mb-3 leading-tight">
              {book.title}
            </h1>
            <p className="text-gray-300 dark:text-gray-300 text-xl mb-3 flex items-center">
              <i className="fas fa-user mr-3 text-text-gray-400 dark:text-gray-400"></i>
              <span className="font-semibold">Author: </span>&nbsp;{book.author}
            </p>
            <p className="text-gray-300 dark:text-gray-300 text-lg mb-3 flex items-center">
              <i className="fas fa-th-list mr-3 text-gray-400 dark:text-gray-400"></i>
              <span className="font-semibold">Category: </span>&nbsp;{book.category}
            </p>
            <p className="text-gray-300 dark:text-gray-300 text-lg mb-4 flex items-center">
              <i className="fas fa-copy mr-3 text-green-400 dark:text-green-400"></i>
              <span className="font-semibold">Available Copies: </span>&nbsp;
              {book.availableCopies}
            </p>
          </div>

          {/* Borrow button */}
          <div className="mt-6">
            <BorrowBtn bookId={book._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
