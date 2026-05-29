import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaCertificate,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Landing() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    token: null,
    name: "",
    role: "",
  });

  useEffect(() => {
    const syncUser = () => {
      setUser({
        token: localStorage.getItem("accessToken"),
        name: localStorage.getItem("name"),
        role: localStorage.getItem("role"),
      });
    };

    syncUser();

    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    setUser({
      token: null,
      name: "",
      role: "",
    });

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-100 to-white overflow-x-hidden relative">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-400/20 rounded-full blur-3xl"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 flex items-center justify-center shadow-lg">
              <FaCertificate className="text-white text-base" />
            </div>

            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-slate-900 bg-clip-text text-transparent">
              CertifyPro
            </h1>
          </div>

          {/* MENU */}
          <div className="flex items-center gap-3">
            {!user.token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 transition font-medium"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 hover:from-emerald-600 hover:to-black text-white shadow-md transition-all duration-300 hover:scale-105"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-2 rounded-xl bg-white/80 border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                  Welcome, {user.name}
                </div>

                <button
                  onClick={() =>
                    user.role === "admin"
                      ? navigate("/admin-dashboard")
                      : navigate("/dashboard")
                  }
                  className="px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 text-white shadow-md hover:scale-105 transition-all duration-300"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-5 sm:px-8 lg:px-12 py-14 relative z-10">
        {/* LEFT */}
        <div className="max-w-xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-5 shadow-sm">
            <FaShieldAlt />
            Trusted Certificate Verification Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
            Verify Certificates
            <span className="block bg-gradient-to-r from-emerald-600 via-emerald-700 to-slate-900 bg-clip-text text-transparent mt-2">
              Instantly & Securely
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">
            A powerful platform designed to issue, manage and verify
            certificates with complete transparency, enterprise-level security
            and lightning-fast validation.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-4">
            {!user.token ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 text-sm sm:text-base rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 hover:from-emerald-600 hover:to-black text-white shadow-xl shadow-emerald-500/20 font-semibold transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 text-sm sm:text-base rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  user.role === "admin"
                    ? navigate("/admin-dashboard")
                    : navigate("/dashboard")
                }
                className="px-6 py-3 text-sm sm:text-base rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 text-white shadow-xl shadow-emerald-500/20 font-semibold transition-all duration-300 hover:scale-105"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="hidden md:flex justify-end lg:justify-center">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 p-6 rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 flex items-center justify-center shadow-lg">
                <FaCertificate className="text-white text-xl" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Why Choose Us?
                </h3>

                <p className="text-xs text-gray-500">
                  Smart & secure verification
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
                <FaShieldAlt className="text-emerald-600 text-lg mt-1" />

                <div>
                  <h4 className="font-semibold text-sm text-gray-800">
                    Enterprise Security
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Tamper-proof certificate validation with secure
                    authentication.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
                <FaBolt className="text-cyan-600 text-lg mt-1" />

                <div>
                  <h4 className="font-semibold text-sm text-gray-800">
                    Instant Verification
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Verify certificates within seconds using unique IDs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
                <FaUsers className="text-emerald-600 text-lg mt-1" />

                <div>
                  <h4 className="font-semibold text-sm text-gray-800">
                    Trusted Platform
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Used by institutions and organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
          Powerful Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCheckCircle />,
              title: "Easy Management",
              desc: "Create and organize certificates effortlessly with a clean dashboard.",
            },

            {
              icon: <FaShieldAlt />,
              title: "Secure System",
              desc: "Advanced security ensures certificates remain authentic and protected.",
            },

            {
              icon: <FaBolt />,
              title: "Fast Verification",
              desc: "Verify certificates instantly with our optimized system.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 flex items-center justify-center text-white text-lg shadow-lg mb-4 group-hover:scale-105 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 relative z-10">
        {/* HEADING */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            A simple, secure workflow for admins and students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Upload Data",
              desc: "Admin uploads student data via Excel.",
            },

            {
              step: "2",
              title: "Generate Certificate",
              desc: "System auto-generates certificates.",
            },

            {
              step: "3",
              title: "Search Certificate",
              desc: "Students search using certificate ID.",
            },

            {
              step: "4",
              title: "Download PDF",
              desc: "Verified certificate ready instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-full blur-3xl"></div>

              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-slate-900 flex items-center justify-center text-white text-xl font-bold shadow-xl mb-5 group-hover:scale-105 transition">
                {item.step}
              </div>

              <div className="relative">
                <p className="text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-semibold mb-2">
                  Step {item.step}
                </p>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-12 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-slate-900 p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>

            <p className="text-emerald-50 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Join the future of certificate verification with a secure and
              modern platform.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-7 px-6 py-3 rounded-2xl bg-white text-emerald-700 text-sm sm:text-base font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-400 py-4 text-center text-xs sm:text-sm">
        © 2026 CertifyPro. All rights reserved.
      </footer>
    </div>
  );
}
