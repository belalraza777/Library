// App.jsx - Main application component
// This component sets up the overall structure of the application, including the Navbar, Footer, and routing.
// It ensures a consistent layout across all pages.
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";



function App() {

  const location = useLocation();
  // Hide navbar/footer only on landing page ("/")
  const hideLayout = location.pathname === "/";

  return (
    <>
      {/* Navbar - only if not landing page */}
      {!hideLayout && <Navbar />}

      {/* Main content area */}
      <div className="flex-grow">
        <AppRoutes />
      </div>

      {/* Footer - only if not landing page */}
      {!hideLayout && <Footer />}

      {/* Global Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
