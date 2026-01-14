import React from 'react'
import { approveReturn } from '../../api/issues';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

export default function ApproveBtn({ id, issuedBooks }) {

    const handleApprove = async () => {
        try {
            //confirmation
            const result = await Swal.fire({
                title: "Approve Book Return?",
                text: "Are you sure you want to approve this return?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Approve",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#16a34a", // green
                cancelButtonColor: "#6b7280"  // gray
            });

            if (result.isConfirmed) {
                //api call
                await approveReturn(id);
                toast.success("Return approved ✅");
                await issuedBooks();
            }
        } catch (error) {
            console.error("Error approving return:", error);
            toast.error(error.response?.data?.message || "Failed to approve");
        }
    };

    return (
        <button
            onClick={handleApprove}
            className="btn"
        >
            Approve
        </button>
    )
}
