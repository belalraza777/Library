import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink 
            className="text-xl md:text-2xl font-bold flex items-center transition-transform " 
          >
            <i className="fas fa-book mr-2 text-blue-400"></i> 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Library
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/books" 
              className="nav-item"
            >
              <i className="fas fa-home mr-2"></i>Home
            </NavLink>

            {!user && (
              <>
                <NavLink to="/login" className="nav-item">
                  <i className="fas fa-sign-in-alt mr-2"></i>Login
                </NavLink>
                <NavLink to="/signup" className="nav-item bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  <i className="fas fa-user-plus mr-2"></i>Signup
                </NavLink>
              </>
            )}

            {user?.role === "admin" ? (
              <>
                <NavLink to="/adminPanel" className="nav-item">
                  <i className="fas fa-user-shield mr-2"></i>Admin Panel
                </NavLink>
                <NavLink to="/adminDashboard" className="nav-item">
                  <i className="fas fa-chart-bar mr-2"></i>Dashboard
                </NavLink>
              </>
            ) : (
              user?.role === "member" && (
                <NavLink to="/userdashboard" className="nav-item">
                  <i className="fas fa-user-cog mr-2"></i>Dashboard
                </NavLink>
              )
            )}

            {user && (
              <NavLink to="/profile" className="nav-item">
                <i className="fas fa-user-circle mr-2"></i>Profile
              </NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label="Toggle menu"
          >
            {!isOpen ? (
              <i className="fas fa-bars w-5 h-5"></i>
            ) : (
              <i className="fas fa-times w-5 h-5"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink 
              to="/books" 
              className="mobile-item" 
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-home mr-3 w-5 text-center"></i>Home
            </NavLink>

            {!user && (
              <>
                <NavLink 
                  to="/login" 
                  className="mobile-item" 
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-sign-in-alt mr-3 w-5 text-center"></i>Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="mobile-item bg-blue-600 hover:bg-blue-700" 
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user-plus mr-3 w-5 text-center"></i>Signup
                </NavLink>
              </>
            )}

            {user?.role === "admin" ? (
              <>
                <NavLink 
                  to="/adminPanel" 
                  className="mobile-item" 
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user-shield mr-3 w-5 text-center"></i>Admin Panel
                </NavLink>
                <NavLink 
                  to="/adminDashboard" 
                  className="mobile-item" 
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-chart-bar mr-3 w-5 text-center"></i>Admin Dashboard
                </NavLink>
              </>
            ) : (
              user?.role === "member" && (
                <NavLink 
                  to="/userdashboard" 
                  className="mobile-item" 
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user-cog mr-3 w-5 text-center"></i>User Dashboard
                </NavLink>
              )
            )}

            {user && (
              <NavLink 
                to="/profile" 
                className="mobile-item" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-user-circle mr-3 w-5 text-center"></i>Profile
              </NavLink>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: #d1d5db;
          transition: all 0.3s ease;
        }
        
        .nav-item:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .mobile-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: #d1d5db;
          transition: all 0.3s ease;
        }
        
        .mobile-item:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Active link styles */
        .nav-item[aria-current="page"],
        .mobile-item[aria-current="page"] {
          color: white;
          background-color: rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;