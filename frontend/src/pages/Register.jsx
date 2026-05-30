import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/auth/register", form);

      toast.success("Account created successfully");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-emerald-50
        via-cyan-50
        to-white
        flex
        items-center
        justify-center
        px-4
        pt-20
        sm:pt-8
        pb-8
        relative
        overflow-hidden
      "
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-emerald-300/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

      {/* Home Button */}
       <button
             onClick={() => navigate("/")}
             className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-lg border border-white/40 shadow hover:shadow-md hover:scale-105 transition-all duration-300 text-sm font-medium text-gray-700"
           >
             <FaArrowLeft />
             Home
           </button>

      {/* Main Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-5xl
          bg-white/70
          backdrop-blur-2xl
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          border
          border-white/40
          grid
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 via-slate-900 to-black text-white p-10 xl:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10 shadow-lg">
              <FaShieldAlt className="text-3xl text-emerald-300" />
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
              Create Your Account 🚀
            </h1>

            <p className="mt-4 text-gray-300 text-sm leading-relaxed max-w-md">
              Join the secure certificate verification platform and manage
              certificates with modern authentication and instant verification.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <FaCheckCircle className="text-emerald-400 text-lg mt-0.5" />
                <span className="text-sm">Secure certificate management</span>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <FaCheckCircle className="text-emerald-400 text-lg mt-0.5" />
                <span className="text-sm">Instant verification system</span>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <FaCheckCircle className="text-emerald-400 text-lg mt-0.5" />
                <span className="text-sm">Trusted & role-based access</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Heading */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-emerald-600 to-black flex items-center justify-center shadow-lg mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Create Account
              </h1>

              <p className="text-sm text-gray-500 mt-2">Register to continue</p>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Register
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Fill your details to get started
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Full Name
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">
                  <FaUser className="text-gray-400" />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-transparent py-3 sm:py-4 outline-none text-sm"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">
                  <FaEnvelope className="text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent py-3 sm:py-4 outline-none text-sm"
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
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300">
                  <FaLock className="text-gray-400" />

                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-3 sm:py-4 outline-none text-sm"
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
                    aria-label={show ? "Hide password" : "Show password"}
                    onClick={() => setShow(!show)}
                    className="text-gray-400 hover:text-emerald-500 transition"
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className="
                  w-full
                  bg-gradient-to-r
                  from-emerald-600
                  to-black
                  hover:from-emerald-700
                  hover:to-slate-900
                  text-white
                  py-3
                  sm:py-4
                  rounded-2xl
                  font-semibold
                  shadow-lg
                  hover:shadow-xl
                  md:hover:scale-[1.02]
                  transition-all
                  duration-300
                  disabled:opacity-70
                "
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center mt-8 text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
