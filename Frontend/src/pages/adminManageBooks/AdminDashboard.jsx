// AdminDashboard.jsx - Administrative Dashboard for managing issued books and return requests.
// This component provides an overview of book issuance statistics and allows administrators to switch between
// viewing issued books and pending return requests.
import { useEffect, useState, useMemo } from 'react'
import { getAllIssues } from '../../api/issues' // API function to fetch all issued books
import IssuedBooksTable from './issuedBooksTable'; // Component to display issued books
import ReturnRequestsTable from './returnRequestsTable'; // Component to display return requests
import SkeletonLoader from "../../components/common/skeletonLoader"; // Import the reusable skeleton loader

export default function AdminDashboard() {
    // State to store all issued books and return requests fetched from the backend
    const [allIssuesBooks, setAllIssuesBooks] = useState([]);
    // State to manage the currently active tab ('issued' or 'requests')
    const [activeTab, setActiveTab] = useState('issued');
    // State to track loading while fetching data
    const [loading, setLoading] = useState(true);

    // Asynchronous function to fetch all issued books and return requests from the API
    async function issuedBooks() {
        try {
            const res = await getAllIssues(); // Call the API to get all issues
            setAllIssuesBooks(res.data || []); // Update state with fetched data, default to empty array if null
        } catch (err) {
            console.log(err); // Log any errors during fetching
        } finally {
            setLoading(false); // Stop loading once fetch completes
        }
    }

    // useEffect hook to fetch books when the component mounts
    useEffect(() => {
        issuedBooks();
    }, []) // Empty dependency array ensures this runs only once on mount

    // Memoized filtered lists for performance
    const issuedBooksList = useMemo(() => allIssuesBooks.filter(book => !book.isReturnRequest), [allIssuesBooks]);
    const returnRequestsList = useMemo(() => allIssuesBooks.filter(book => book.isReturnRequest), [allIssuesBooks]);
    const overdueList = useMemo(() => allIssuesBooks.filter(book => book.fine > 0), [allIssuesBooks]);
    
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
        // Main container for the admin dashboard (forced dark theme)
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header section of the dashboard */}
                <header className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center text-white">
                        <i className="fas fa-chart-bar mr-3 text-blue-400"></i>Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-lg">Manage issued books and return requests efficiently.</p>
                </header>

                {/* Statistics Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Card for Total Issued Books */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold text-gray-300 flex items-center"><i className="fas fa-book mr-2 text-purple-400"></i>Total Issued Books</h2>
                        <p className="text-4xl font-bold text-blue-400 mt-2">{allIssuesBooks.length}</p>
                    </div>
                    {/* Card for Pending Return Requests */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold text-gray-300 flex items-center"><i className="fas fa-clock mr-2 text-yellow-400"></i>Pending Return Requests</h2>
                        <p className="text-4xl font-bold text-green-400 mt-2">{returnRequestsList.length}</p>
                    </div>
                    {/* Card for Overdue Books */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold text-gray-300 flex items-center"><i className="fas fa-hourglass-half mr-2 text-red-400"></i>Overdue Books</h2>
                        {/* You'll need to add logic to calculate overdue books here */}
                        <p className="text-4xl font-bold text-red-400 mt-2">{overdueList.length}</p>
                    </div>
                </div>

                {/* Tab Navigation for Issued Books and Return Requests */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {/* Button to activate the Issued Books tab */}
                    <button
                        className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'issued'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                        onClick={() => setActiveTab('issued')}
                    >
                        <i className="fas fa-book mr-2"></i>Issued Books ({issuedBooksList.length})
                    </button>
                    {/* Button to activate the Return Requests tab */}
                    <button
                        className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'requests'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        <i className="fas fa-hourglass-half mr-2"></i>Return Requests ({returnRequestsList.length})
                    </button>
                </div>

                {/* Content area that displays either IssuedBooksTable or ReturnRequestsTable based on activeTab */}
                <div className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 border border-gray-700">
                    {activeTab === 'issued' ? (
                        <IssuedBooksTable issuedBooksList={issuedBooksList} issuedBooks={issuedBooks} />
                    ) : (
                        <ReturnRequestsTable returnRequestsList={returnRequestsList} issuedBooks={issuedBooks} />
                    )}
                </div>
            </div>
        </div>
    );
}
