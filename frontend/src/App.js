import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authEvent } from "./utils/authEvent";
import UploadExcel from "./components/UploadExcel";
import ManageCertificates from "./pages/ManageCertificates";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    };

    authEvent.addEventListener("logout", handleLogout);

    return () => {
      authEvent.removeEventListener("logout", handleLogout);
    };
  }, [navigate]);

  return (
    // <BrowserRouter>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/upload" element={
        <ProtectedRoute>
          <AdminRoute>
            <UploadExcel />
          </AdminRoute>
        </ProtectedRoute>} />

        <Route path="/manage-certificates" element={
             <ProtectedRoute>
          <AdminRoute>
          <ManageCertificates />
          </AdminRoute>
        </ProtectedRoute> } />


    </Routes>

    // </BrowserRouter>
  );
}

export default App;