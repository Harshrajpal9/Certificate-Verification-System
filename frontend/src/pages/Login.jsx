import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("accessToken", res.data.accessToken);

      localStorage.setItem("role", res.data.role);

      localStorage.setItem("name", res.data.name);

      toast.success("Login successful");

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-lg border border-white/40 shadow hover:shadow-md hover:scale-105 transition-all duration-300 text-sm font-medium text-gray-700"
      >
        <FaArrowLeft />
        Home
      </button>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-500 via-slate-800 to-black text-white p-10 xl:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-lg">
              <FaShieldAlt className="text-3xl" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back 👋
            </h1>

            <p className="mt-4 text-emerald-50 text-sm leading-relaxed max-w-md">
              Securely access your dashboard to verify, manage, and download
              certificates with ease.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <FaCheckCircle className="text-lg" />
                <span className="text-sm">Verify certificates instantly</span>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <FaCheckCircle className="text-lg" />
                <span className="text-sm">Download official certificates</span>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <FaCheckCircle className="text-lg" />
                <span className="text-sm">Secure and role-based access</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-10">
          <div className="w-full max-w-md">
            {/* Mobile Heading */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>

              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

              <p className="text-sm text-gray-500 mt-2">Login to continue</p>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Login</h2>

              <p className="text-gray-500 text-sm mt-2">
                Enter your credentials to continue
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={login} className="space-y-5">
              {/* Email */}
              <div className="group">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Email Address
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-emerald-500" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent py-4 outline-none text-sm"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Password
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">
                  <FaLock className="text-gray-400" />

                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-4 outline-none text-sm"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-gray-400 hover:text-emerald-500 transition"
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 hover:from-emerald-600 hover:via-emerald-700 hover:to-black text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center mt-8 text-sm text-gray-600">
              Don’t have an account?
              <Link
                to="/register"
                className="ml-1 text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
