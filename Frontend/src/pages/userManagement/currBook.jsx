// CurrentBooks.jsx - Displays a list of books currently borrowed by a user.
// This component is part of the User Dashboard, showing details of active book loans and providing
// a button to request a return for each book.
import RequestBtn from '../../components/buttons/requestBtn'; // Button component to request book return

const CurrentBooks = ({ books, refreshBooks }) => {
  // Display a message if there are no books currently borrowed
  if (books.length === 0) {
    return <p className="text-gray-500">No books currently borrowed.</p>;
  }

  return (
    // Grid container for displaying books in a responsive layout
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Map through the books array to render each currently borrowed book as a card */}
      {books.map((issue) => (
        <div key={issue._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition duration-300 border border-gray-200 dark:border-gray-700">
          <div>
            {/* Book Title with an icon */}
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 truncate flex items-center"><i className="fas fa-book-open mr-2 text-blue-500"></i>
            {issue.bookId?.title || 'N/A'}
            </h3>
            {/* Book Author with an icon */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 flex items-center">By <span className="font-medium ml-1"><i className="fas fa-user mr-1 text-gray-500"></i>{issue.bookId?.author || 'N/A'}</span></p>
            {/* Issue Date with an icon */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 flex items-center"><i className="fas fa-calendar-alt mr-2 text-gray-500">
              </i>Issued: {new Date(issue.issueDate).toLocaleDateString()}
              </p>
            {/* Due Date with an icon, styled in red to highlight importance */}
            <p className="text-red-600 dark:text-red-400 text-sm mb-3 flex items-center"><i className="fas fa-hourglass-half mr-2 text-red-500"></i>Due: {new Date(issue.dueDate).toLocaleDateString()}</p>
            {/* Fine Amount with an icon */}
            <p className="text-gray-800 dark:text-gray-200 text-md font-semibold flex items-center"><i className="fas fa-rupee-sign mr-2 text-green-600"></i>Fine: {issue.fine}</p>
          </div>
          {/* Request Return Button */}
          <div className="mt-4">
            <RequestBtn
              id={issue._id}
              isReturnRequest={issue.isReturnRequest}
              getIssuedBooks={refreshBooks} // Callback to refresh the book list after a request is made
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentBooks;