// src/pages/Landing.jsx
import { NavLink } from "react-router-dom";
import { fetchHomeData } from "../../api/general";
import { useState, useEffect } from "react";
import SkeletonLoader from "./skeletonLoader";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  async function fetch() {
    try {
      await fetchHomeData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Trigger fetch when component mounts
  useEffect(() => {
    fetch();
  }, []);

  // Show skeleton loader while fetching data
if (loading) {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex items-center justify-center">
      <div className="w-full max-w-lg p-6">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
          <SkeletonLoader type="landing" />
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <i className="fas fa-book-open text-2xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Library
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Your gateway to knowledge
            </p>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Discover Our Collection</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Access thousands of books, journals, and resources with your account
            </p>
          </div>

          {/* Authentication Options */}
          <div className="space-y-4">
            {/* Explore Option */}
            <NavLink
              to="/books"
              className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
            >
              <span className="font-semibold">Explore Library</span>
              <div className="flex items-center">
                <span className="mr-2 text-blue-100 group-hover:translate-x-1 transition-transform duration-300">
                  Get started
                </span>
                <i className="fas fa-arrow-right text-sm"></i>
              </div>
            </NavLink>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
              <span className="flex-shrink mx-4 text-slate-500 dark:text-slate-400 text-sm">or</span>
              <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
            </div>

            {/* Login & Signup */}
            <div className="grid grid-cols-2 gap-3">
              <NavLink
                to="/login"
                className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-blue-400 dark:hover:border-blue-500"
              >
                <i className="fas fa-sign-in-alt text-blue-500"></i>
                <span>Login</span>
              </NavLink>

              <NavLink
                to="/signup"
                className="flex items-center justify-center gap-2 p-3 bg-slate-800 dark:bg-slate-900 text-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-slate-700 dark:hover:bg-slate-800"
              >
                <i className="fas fa-user-plus text-blue-400"></i>
                <span>Sign Up</span>
              </NavLink>
            </div>
          </div>

          {/* Authentication Notice */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-500 mt-0.5 mr-3"></i>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You'll need an account to access our full library collection. Sign up now for free access.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} LibraryHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
