// ReturnRequestsTable.jsx - Displays a table of book return requests.
// This component is used in the Admin Dashboard to show all pending book return requests from users,
// allowing administrators to approve these requests.
import ApproveBtn from '../../components/buttons/approveBtn'; // Button component to approve return requests

export default function ReturnRequestsTable({ returnRequestsList, issuedBooks }) {
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
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {/* Conditional rendering: Display a "No return requests found" message if the list is empty */}
                    {returnRequestsList.length === 0 ? (
                        <tr className="bg-gray-800 border-b border-gray-700">
                            <td colSpan="6" className="py-4 px-6 text-center font-medium text-gray-400">
                                No return requests found.
                            </td>
                        </tr>
                    ) : (
                        // Map through the returnRequestsList array to render each return request as a table row
                        returnRequestsList.map((issue) => (
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
                                {/* Action button to approve the return request */}
                                <td className="py-4 px-6">
                                    <ApproveBtn id={issue._id} issuedBooks={issuedBooks} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
