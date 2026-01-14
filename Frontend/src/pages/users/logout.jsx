import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Logout() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    // Confirm logout
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await handleLogout();
      toast.success("Logged out successfully 👋");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again!");
    }
  };

  return (
    <button
      onClick={onLogout}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    >
      <i className="fas fa-sign-out-alt"></i>
      Logout
    </button>
  );
}