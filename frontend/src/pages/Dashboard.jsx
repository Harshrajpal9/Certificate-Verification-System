import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiShield,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

export default function UserDashboard() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [stats, setStats] = useState({
    downloads: 0,
    verified: 0,
    message: "",
    username: "",
  });

  useEffect(() => {
    loadUser();
    loadStats();
  }, []);

  const loadUser = async () => {
    try {
      const res = await API.get("/auth/user");

      setStats((prev) => ({
        ...prev,
        message: res.data.msg,
        username: res.data.username,
      }));
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refresh = await API.post("/auth/refresh");

          localStorage.setItem("accessToken", refresh.data.accessToken);

          const retry = await API.get("/auth/user");

          setStats((prev) => ({
            ...prev,
            message: retry.data.msg,
          }));
        } catch {
          toast.error("Session expired, login again");
        }
      }
    }
  };

  const loadStats = async () => {
    try {
      const res = await API.get("/certificates/stats");

      setStats((prev) => ({
        ...prev,
        downloads: res.data.downloads,
        verified: res.data.verified,
      }));
    } catch {
      console.log("Stats error");
    }
  };

  const verifyCertificate = async () => {
    if (!certId.trim()) {
      return toast.error("Enter Certificate ID");
    }

    try {
      const res = await API.get(`/certificates/verify/${certId}`);

      setResult(res.data);

      toast.success("Certificate Verified ✅");

      await loadStats();
    } catch {
      setResult(null);
      toast.error("Invalid Certificate ❌");
    }
  };

  const handleDownload = () => {
    if (!result) return;

    window.open(
      `${process.env.REACT_APP_API_URL}/certificates/download/${result.certificateId}`
    );

    setTimeout(() => {
      loadStats();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-4 md:px-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-5 md:p-7 shadow-xl mb-6">
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Certificate Verification Portal
            </h1>

            <p className="text-emerald-50 mt-2 text-sm max-w-2xl">
              Verify, preview and download internship certificates securely
              using your unique certificate ID.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs">
              <FiShield />
              Welcome, {stats.username}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {/* Downloads */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Downloads</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.downloads}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                <FiDownload className="text-2xl text-cyan-600" />
              </div>
            </div>
          </div>

          {/* Verified */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Verified Certificates</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.verified}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FiCheckCircle className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Search Card */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl shadow-xl p-5 md:p-6  self-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-md">
                <FiSearch className="text-white text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Verify Certificate
                </h2>

                <p className="text-xs text-gray-500">
                  Enter your certificate ID
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Enter Certificate ID"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition text-sm"
              />

              <button
                onClick={verifyCertificate}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-5 py-3 rounded-xl shadow-md transition-all duration-300 font-medium text-sm"
              >
                Search
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">Example: CERT2025XYZ</p>
          </div>

          {/* Certificate Card */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 md:p-6 text-white min-h-[450px] md:min-h-[520px]">
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-xl font-bold">Certificate Snapshot</h3>

                  <p className="text-gray-400 text-xs mt-1">
                    Preview verified certificate details
                  </p>
                </div>

                {result && (
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-400/20">
                    Verified
                  </div>
                )}
              </div>

              {result ? (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Student Name</p>

                    <h4 className="text-base font-semibold">{result.name}</h4>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">
                      Internship Domain
                    </p>

                    <h4 className="text-base font-semibold">{result.domain}</h4>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">
                      Internship Duration
                    </p>

                    <h4 className="text-sm font-medium">
                      {new Date(result.startDate).toLocaleDateString()} -{" "}
                      {new Date(result.endDate).toLocaleDateString()}
                    </h4>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Certificate ID</p>

                    <h4 className="font-mono text-emerald-400 text-sm">
                      {result.certificateId}
                    </h4>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      onClick={() =>
                        setPreviewUrl(
                          `${process.env.REACT_APP_API_URL}/certificates/view/${result.certificateId}`
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition font-medium text-sm"
                    >
                      <FiEye />
                      View
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-4 py-2.5 rounded-xl transition font-medium shadow-md text-sm"
                    >
                      <FiDownload />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <FiFileText className="text-3xl text-gray-300" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    No Certificate Selected
                  </h3>

                  <p className="text-gray-400 text-sm mt-2 max-w-sm">
                    Search using your certificate ID to view certificate details
                    and download the PDF.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mt-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-3 md:p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <FiEye className="text-white text-base" />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800">
                  Certificate Preview
                </h3>

                <p className="text-[11px] text-gray-500">
                  Printable certificate preview
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] bg-white"
                title="Certificate Preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
