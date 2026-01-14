import { NavLink } from "react-router-dom";

export default function Unknown() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800 transition"
      >
        Go Home
      </NavLink>
    </div>
  );
}
