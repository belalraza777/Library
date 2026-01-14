// IssuedBooksTable.jsx - Displays a table of currently issued books.
// This component is used in the Admin Dashboard to show all books that are currently borrowed by users,
// along with their issue details and current status.

export default function IssuedBooksTable({ issuedBooksList, issuedBooks }) {
    return (
        // Main container for the responsive table, including shadow and rounded corners
        <div className="overflow-x-auto relative shadow-lg sm:rounded-lg border border-gray-700">
            {/* Table element with styling for full width, text alignment, and text color */}
            <table className="w-full text-sm text-left text-gray-300">
                {/* Table Header */}
                <thead className="text-xs uppercase bg-gray-900 text-gray-400 border-b border-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">Book Title</th>
                        <th scope="col" className="py-3 px-6">User</th>
                        <th scope="col" className="py-3 px-6">Issue Date</th>
                        <th scope="col" className="py-3 px-6">Due Date</th>
                        <th scope="col" className="py-3 px-6">Fine</th>
                        <th scope="col" className="py-3 px-6">Status</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {/* Conditional rendering: Display a "No issued books found" message if the list is empty */}
                    {issuedBooksList.length === 0 ? (
                        <tr className="bg-gray-800 border-b border-gray-700">
                            <td colSpan="6" className="py-4 px-6 text-center font-medium text-gray-400">
                                No issued books found.
                            </td>
                        </tr>
                    ) : (
                        // Map through the issuedBooksList array to render each issued book as a table row
                        issuedBooksList.map((issue) => (
                            <tr 
                                key={issue._id} 
                                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition"
                            >
                                {/* Book Title */}
                                <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                                    {issue.bookId?.title || 'N/A'}
                                </td>
                                {/* User Name */}
                                <td className="py-4 px-6">{issue.userId?.username || 'N/A'}</td>
                                {/* Issue Date */}
                                <td className="py-4 px-6">{new Date(issue.issueDate).toLocaleDateString()}</td>
                                {/* Due Date */}
                                <td className="py-4 px-6">{new Date(issue.dueDate).toLocaleDateString()}</td>
                                {/* Fine Amount (conditional display based on return acceptance) */}
                                <td className="py-4 px-6">
                                    ₹{issue.returnAccept ? issue.fineAmount : issue.fine}
                                </td>
                                {/* Status Badge (Return Accepted or Issued) */}
                                <td className="py-4 px-6">
                                    {issue.returnAccept ? (
                                        <span className="bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                            Return Accepted ✅
                                        </span>
                                    ) : (
                                        <span className="bg-blue-900 text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                            Issued
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
