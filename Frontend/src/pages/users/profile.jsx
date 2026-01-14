import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ChangePassForm from "./changePassForm";
import { resetPassword } from '../../api/users';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import Logout from "./logout";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [openForm, setOpenForm] = useState(false);

  async function ChangePassword(data) {
    try {
      // Confirmation
      const confirm = await Swal.fire({
        title: "Confirm Password Change",
        text: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2563eb", // blue
        cancelButtonColor: "#d33",
      });
      if (!confirm.isConfirmed) return;

      const res = await resetPassword(data); //api call
      toast.success("Password changed successfully ✅");
      setOpenForm(false);
      setForm({ oldPassword: "", newPassword: "" }); // reset form
    } catch (err) {
      console.error("Change Password failed:", err);
      toast.error(err.response?.data?.message || "Failed to change password ❌");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      {/* Profile Card */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-700/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg mb-4">
            <i className="fas fa-user-circle text-3xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-white">Profile Information</h1>
          <p className="text-gray-400 mt-2">Manage your account settings</p>
        </div>

        {/* User Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-lg mr-3">
              <i className="fas fa-user text-indigo-400"></i>
            </div>
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-white font-medium">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-lg mr-3">
              <i className="fas fa-envelope text-indigo-400"></i>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-lg mr-3">
              <i className="fas fa-user-tag text-indigo-400"></i>
            </div>
            <div>
              <p className="text-sm text-gray-400">Role</p>
              <p className="text-white font-medium capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center justify-center gap-2 flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
          >
            <i className="fas fa-key"></i>
            Change Password
          </button>

          <Logout className="flex items-center justify-center gap-2 flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-md">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Logout>
        </div>
      </div>

      {/* Password Change Modal */}
      <ChangePassForm
        form={form}
        setForm={setForm}
        openForm={openForm}
        setOpenForm={setOpenForm}
        ChangePassword={ChangePassword}
      />
    </main>
  );
}