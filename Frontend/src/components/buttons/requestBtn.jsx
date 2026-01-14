// RequestBtn.jsx - Button component for initiating a book return request.
// This component allows a user to send a request to return a borrowed book.
// Its appearance and functionality change based on whether a return request has already been sent.
import React from 'react'
import { requestReturn } from '../../api/issues'; // API function to send a return request
import { toast } from 'react-toastify';
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

export default function RequestBtn({ id, isReturnRequest, getIssuedBooks }) {

    // Asynchronous function to handle sending a book return request
    async function requestToReturn(bookId) {
        try {
            // confirmation
            const result = await Swal.fire({
                title: "Send Return Request?",
                text: "Are you sure you want to send a request to return this book?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, Send Request",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#2563eb", // blue
                cancelButtonColor: "#6b7280"  // gray
            });

            if (result.isConfirmed) {
                await requestReturn(bookId); // Call the API to send the request
                toast.success("Return request sent ");
                getIssuedBooks(); // Refresh the list of issued books after the request is sent
            }
        } catch (err) {
            console.log(err); // Log any errors that occur during the request
            toast.error(err.response?.data?.message || "Failed to send request");
        }
    }

    return (
        // Button element with dynamic styling and text based on the `isReturnRequest` prop
        <button
            onClick={() => requestToReturn(id)}
            disabled={isReturnRequest} // Disable the button if a return request has already been made
            className={`btn w-full ${isReturnRequest ? ' !bg-purple-300 !rounded !border-none pointer-events-none' : ''}`}
        >
            {/* Conditional text and icon based on whether a return request is pending */}
            {isReturnRequest
                ? <span><i className="fas fa-hourglass-half mr-2"></i>Request Sent, Awaiting Approval</span>
                : <span><i className="fas fa-paper-plane mr-2"></i>Request To Return</span>
            }
        </button>
    )
}
