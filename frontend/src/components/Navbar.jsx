import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaCertificate,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");

  const logout = async () => {
    try {
      await API.post("/auth/logout");

      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-md">
      
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-slate-800 to-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
              <FaCertificate className="text-white text-lg" />
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-slate-700 to-black bg-clip-text text-transparent">
                CertifyPro
              </h1>

              <p className="text-[10px] text-gray-500 -mt-1">
                Secure Verification
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-3">

            {/* HOME */}
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
            >
              Home
            </button>

            {/* DASHBOARD */}
            <button
              onClick={() =>
                role === "admin"
                  ? navigate("/admin-dashboard")
                  : navigate("/dashboard")
              }
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
            >
              Dashboard
            </button>

            {/* ADMIN MENU */}
            {role === "admin" && (
              <button
                onClick={() => navigate("/upload")}
                className="px-4 py-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
              >
                Upload
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => navigate("/manage-certificates")}
                className="px-4 py-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
              >
                Certificates
              </button>
            )}

            {/* ROLE BADGE */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 border border-gray-200 shadow-sm ml-2">
              <FaShieldAlt className="text-emerald-500 text-sm" />

              <span className="text-sm font-medium text-gray-700 capitalize">
                {role}
              </span>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="ml-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-slate-800 to-black hover:from-emerald-600 hover:via-slate-900 hover:to-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-medium"
            >
              Logout
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 rounded-2xl bg-gradient-to-r from-emerald-500 via-slate-800 to-black text-white shadow-lg flex items-center justify-center"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-5 animate-in slide-in-from-top duration-300">
          
          <div className="bg-white/90 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-5 flex flex-col gap-3">

            {/* ROLE */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-100 border border-gray-200">
              
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 via-slate-800 to-black flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Logged in as</p>

                <p className="text-sm font-semibold text-gray-800 capitalize">
                  {role}
                </p>
              </div>
            </div>

            {/* HOME */}
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium"
            >
              Home
            </button>

            {/* DASHBOARD */}
            <button
              onClick={() => {
                navigate(
                  role === "admin"
                    ? "/admin-dashboard"
                    : "/dashboard"
                );

                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium"
            >
              Dashboard
            </button>

            {/* ADMIN */}
            {role === "admin" && (
              <button
                onClick={() => {
                  navigate("/upload");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-2xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium"
              >
                Upload
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => {
                  navigate("/manage-certificates");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-2xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium"
              >
                Certificates
              </button>
            )}

            {/* LOGOUT */}
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-slate-800 to-black hover:from-emerald-600 hover:via-slate-900 hover:to-black text-white shadow-lg transition-all duration-300 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

