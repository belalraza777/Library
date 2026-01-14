import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Imports the authentication context
import { toast } from 'react-toastify';
import Loader from "../../components/common/loader";


export default function Login() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { handleLogin } = useAuth(); // Destructures the handleLogin function from the authentication context

  // State to store form input data (email and password)
  const [formData, setFormData] = useState({ email: "", password: "" });
  // State to store and display any error messages during login
  const [error, setError] = useState("");
  // State to manage loading state during API calls, preventing multiple submissions
  const [loading, setLoading] = useState(false);

  // Handles changes in form input fields, updating the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission, performing login and managing UI state
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(""); // Clear previous errors
    setLoading(true); // Set loading to true to disable button and show loading indicator

    try {
      // Attempt to log in using the handleLogin function from auth context
      const res = await handleLogin(formData);
      if (res.success) {
        toast.success("Welcome Back");
        navigate("/books"); // If login is successful, navigate to the home page
      } else {
        setError(res.message); // Display error message from the backend
        toast.error(res.message);
      }
    } catch (err) {
      setError("Something went wrong. Try again."); // Catch and display general errors
      console.error(err);
      toast.error(err);
    } finally {
      setLoading(false); // Always reset loading state after attempt
    }
  };

  return (<div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
      <h3 className="text-2xl font-bold text-center text-white">Login to your account</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="mt-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-gray-300" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={loading}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-baseline justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? <Loader /> : "Login"}
            </button>

          </div>

          {/* Signup */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}
