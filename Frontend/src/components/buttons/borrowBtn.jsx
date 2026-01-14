// BorrowBtn.jsx - Button for borrowing a book and displaying an issue slip
// This component allows users to initiate a book borrowing process and shows a confirmation slip upon successful issuance.
import React, { useState } from 'react';
import { issueBook } from '../../api/issues'; // API function to issue a book
import IssueSlip from '../issueSlip'; // Component to display the issue slip
import { toast } from 'react-toastify';
import Swal from "sweetalert2";


export default function BorrowBtn({ bookId }) {
    // State to store the details of the issued book, used to display the IssueSlip
    const [issued, setIssued] = useState(null);

    // Function to handle the book issuance process
    async function issue(id) {
        //confirmation
        const result = await Swal.fire({
            title: "Borrow this book?",
            text: "Do you want to issue this book now?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Borrow",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2563eb", // blue
            cancelButtonColor: "#6b7280"   // gray
        });
        if (!result.isConfirmed) return;


        try {
            const response = await issueBook(id); // Call the API to issue the book
            console.log(response);

            // Check if the issuance was successful
            if (!response.success) {
                // Display an alert with the backend error message if issuance fails
                toast.error(response.message || "Failed to issue book");
                return; // Stop further execution if there's an error
            }
            // If successful, set the issued state to display the slip
            setIssued(response.data);
            toast.success("Book issued successfully");
        } catch (error) {
            // Catch and log any unexpected errors during the API call
            console.error("Failed to issue book:", error);
            // Display a generic error message or specific backend message
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }

    return (
        // Container for the button and the issue slip
        <div className="flex flex-col items-start">
            {/* Borrow button with styling and onClick handler */}
            <button
                onClick={() => issue(bookId)}
                className="btn"
            >
                <i className="fas fa-handshake mr-2"></i>Borrow
            </button>
            {/* Conditionally render the IssueSlip component if a book has been successfully issued */}
            {issued && <IssueSlip issued={issued} onClose={() => setIssued(null)} />}
        </div>
    );
}
