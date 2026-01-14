// BookTable.jsx - Displays a list of books in a responsive dark-themed table

export default function BookTable({ books, handleEdit, handleDelete }) {
  return (
    // Main container for the responsive table
    <div className="overflow-x-auto relative shadow-lg sm:rounded-lg border border-gray-700">
      {/* Table */}
      <table className="w-full text-sm text-left text-gray-300">
        {/* Table Header */}
        <thead className="text-xs uppercase bg-gray-900 text-gray-400 border-b border-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">Image</th>
            <th scope="col" className="py-3 px-6">Title</th>
            <th scope="col" className="py-3 px-6">Author</th>
            <th scope="col" className="py-3 px-6">Category</th>
            <th scope="col" className="py-3 px-6 text-center">Available</th>
            <th scope="col" className="py-3 px-6 text-center">Total</th>
            <th scope="col" className="py-3 px-6">ISBN</th>
            <th scope="col" className="py-3 px-6">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {/* If no books available */}
          {books.length === 0 ? (
            <tr className="bg-gray-900 border-b border-gray-700">
              <td
                colSpan="8"
                className="py-4 px-6 text-center font-medium text-gray-400"
              >
                No books found.
              </td>
            </tr>
          ) : (
            // Render books
            books.map((book) => (
              <tr
                key={book._id}
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition"
              >
                {/* Book Image */}
                <td className="py-4 px-6">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded-md border border-gray-700"
                  />
                </td>

                {/* Book Title */}
                <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                  {book.title}
                </td>

                {/* Book Author */}
                <td className="py-4 px-6">{book.author}</td>

                {/* Book Category */}
                <td className="py-4 px-6">{book.category}</td>

                {/* Available Copies */}
                <td className="py-4 px-6 text-center">{book.availableCopies}</td>

                {/* Total Copies */}
                <td className="py-4 px-6 text-center">{book.totalCopies}</td>

                {/* ISBN */}
                <td className="py-4 px-6">{book.isbn}</td>

                {/* Action Buttons */}
                <td className="py-4 px-6 flex justify-center items-center space-x-2">
                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(book)}
                    className="font-medium text-blue-400 hover:bg-blue-100 transition inline-flex items-center cursor-pointer border p-2.5"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="font-medium text-red-400 hover:bg-red-100 transition inline-flex items-center cursor-pointer border p-2.5"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
