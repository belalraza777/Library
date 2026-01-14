// UserDashboard.jsx - User-specific dashboard displaying borrowed and returned books.
// This component fetches and categorizes books issued to the logged-in user,
// presenting them in a tabbed interface for easy viewing of current and returned books.
import React, { useEffect, useState } from 'react'
import { getMyBooks } from '../../api/issues'; // API function to fetch user's issued books
import CurrentBooks from '../userManagement/currBook'; // Component to display currently borrowed books
import ReturnedBooks from '../userManagement/returnedBook'; // Component to display previously returned books
import SkeletonLoader from "../../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function UserDashboard() {
  // State to store books currently borrowed by the user
  const [currBooks, setCurrBooks] = useState([]);
  // State to store books previously returned by the user
  const [returnedBooks, setReturnedBooks] = useState([]);
  // State to manage the active tab, either 'current' (for current books) or 'returned' (for returned books)
  const [activeTab, setActiveTab] = useState('current');

  const [loading, setLoading] = useState(true);

  // Asynchronous function to fetch all books issued to the current user
  async function getIssuedBooks() {
    try {
      const res = await getMyBooks(); // Call the API to get user's books
      const books = res.data || []; // Ensure books is an array, even if API returns null/undefined

      // Filter fetched books into two categories: currently borrowed and returned
      setCurrBooks(books.filter((book) => !book.returnAccept)); // Books not yet returned
      setReturnedBooks(books.filter((book) => book.returnAccept)); // Books that have been returned
    } catch (error) {
      console.error("Failed to fetch books:", error); // Log any errors during fetching
    } finally {
      setLoading(false);
    }
  }

  // useEffect hook to fetch books when the component mounts
  useEffect(() => {
    getIssuedBooks();
  }, []); // Empty dependency array ensures this runs only once on mount


  // Show skeleton loader while fetching data
  if (loading) {
    return (
      // Main container for the admin dashboard (forced dark theme)
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Skeleton for statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SkeletonLoader type="detail" count={3} />
          </div>
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
    // Main container for the user dashboard with styling for background, minimum height, padding, font, and text color
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header section of the dashboard */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-2 flex items-center">
            <i className="fas fa-book-reader mr-3 text-teal-600"></i>My Library Books
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">View your currently borrowed and previously returned books.</p>
        </header>

        {/* Tab Navigation for Current Books and Returned Books */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
          {/* Button to activate the Current Books tab */}
          <button
            className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'current'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}
            `}
            onClick={() => setActiveTab('current')}
          >
            <i className="fas fa-book-open mr-2"></i>Current Books ({currBooks.length})
          </button>
          {/* Button to activate the Returned Books tab */}
          <button
            className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'returned'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}
            `}
            onClick={() => setActiveTab('returned')}
          >
            <i className="fas fa-history mr-2"></i>Returned Books ({returnedBooks.length})
          </button>
        </div>

        {/* Content area that displays either CurrentBooks or ReturnedBooks component based on activeTab */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          {activeTab === 'current' ? (
            <CurrentBooks books={currBooks} refreshBooks={getIssuedBooks} />
          ) : (
            <ReturnedBooks books={returnedBooks} />
          )}
        </div>
      </div>
    </main>
  );
}