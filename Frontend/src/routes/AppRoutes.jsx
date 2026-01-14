// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";

// Pages
import HomePage from "../pages/HomePage";
import BookDetailsPage from "../pages/BookDetailsPage";
import Login from "../pages/users/login";
import Signup from "../pages/users/signup";
import AdminPanel from "../pages/adminManageBooks/AdminPanel";
import AdminDashboard from "../pages/adminManageBooks/AdminDashboard";
import UserDashboard from "../pages/userManagement/UserDashboard";
import Unknown from "../components/common/unknown";
import Landing from "../components/common/Landing";
import Unauthorized from "../components/common/unauthorized";
import Profile from "../pages/users/profile";

export default function AppRoutes() {
  return (

    
    <Routes>
      {/* landing page */}
      <Route path="/" element={<Landing />} />

      {/* Home - Protected for member & admin */}
      <Route
        path="/books"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* Book Details - Protected */}
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <BookDetailsPage />
          </ProtectedRoute>
        }
      />

      {/* profile */}
       <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Member only */}
      <Route
        path="/userdashboard"
        element={
          <ProtectedRoute allowedRoles={["member", "admin"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin only */}
      <Route
        path="/adminPanel"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* unknown page */}
      <Route path="*" element={<Unknown />} />

    </Routes>
  );
}
