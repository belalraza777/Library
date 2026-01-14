// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import useGetAllBooks from "../context/getAllBooks";
import SkeletonLoader from "../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function HomePage() {
  const { allBooks, loading } = useGetAllBooks();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // If data is still loading, display 8 skeleton cards
          // SkeletonLoader automatically handles card layout and spacing
          <SkeletonLoader type="card" count={8} />
        ) : (
          // If data is loaded, display the actual book cards
          allBooks.map((book) => (
            <div
              key={book._id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/book/${book._id}`} className="block">
                {/* Book cover image */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  {/* Book title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate flex items-center">
                    <i className="fas fa-book-open mr-2 text-blue-500"></i>
                    {book.title}
                  </h3>
                  {/* Book author */}
                  <p className="text-gray-600 text-sm flex items-center">
                    <i className="fas fa-user mr-2 text-gray-500"></i>
                    {book.author}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
