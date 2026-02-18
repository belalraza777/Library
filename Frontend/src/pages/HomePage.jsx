// HomePage.jsx
import React, { useState, useMemo } from "react";
import { filterBooks } from "../helpers/filterBooks";
import { Link } from "react-router-dom";
import useGetAllBooks from "../context/getAllBooks";
import SkeletonLoader from "../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function HomePage() {
  const { allBooks, loading } = useGetAllBooks();
  const [search, setSearch] = useState("");

  const filteredBooks = useMemo(() => filterBooks(allBooks, search), [allBooks, search]);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍Search by title or author..."
          className="w-full max-w-md px-4 py-2 rounded-lg  text-black bg-gray-200 border border-white-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <SkeletonLoader type="card" count={8} />
        ) : filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">No books found.</div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/book/${book._id}`} className="block">
                <img
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate flex items-center">
                    <i className="fas fa-book-open mr-2 text-blue-500"></i>
                    {book.title}
                  </h3>
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
