import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiTrash2,
  FiFileText,
  FiMail,
  FiAward,
} from "react-icons/fi";

export default function ManageCertificates() {
  const [certs, setCerts] = useState([]);
  const [editingCert, setEditingCert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
  });

  const load = async () => {
    try {
      const res = await API.get("/certificates");
      setCerts(res.data);
    } catch {
      toast.error("Failed to load certificates");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // OPEN UPDATE MODAL
  const updateCert = (cert) => {
    setEditingCert(cert);

    setFormData({
      name: cert.name,
      email: cert.email,
      domain: cert.domain,
    });
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE UPDATE
  const saveUpdate = async () => {
    try {
      await API.put(`/certificates/${editingCert._id}`, formData);

      toast.success("Certificate updated successfully");

      setEditingCert(null);

      load();
    } catch {
      toast.error("Update failed");
    }
  };

  // DELETE CERTIFICATE
  const deleteCert = async (id) => {
    const result = await Swal.fire({
      title: "Delete Certificate?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/certificates/${id}`);

        toast.success("Certificate deleted");

        load();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Manage Certificates
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              View, edit and manage all issued certificates.
            </p>
          </div>

          {/* TOTAL CARD */}
          <div className="bg-white shadow-lg rounded-2xl px-6 py-4 border border-emerald-100">
            <p className="text-sm text-gray-500">Total Certificates</p>

            <div className="flex items-center gap-2 mt-1">
              <FiAward className="text-emerald-600 text-xl" />

              <h2 className="text-3xl font-bold text-emerald-600">
                {certs.length}
              </h2>
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white/80 backdrop-blur-lg border border-white shadow-2xl rounded-3xl overflow-hidden">
          {/* TABLE HEADER */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-emerald-500 to-cyan-500">
            <h3 className="text-white font-semibold text-lg">
              Certificate Records
            </h3>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr className="text-gray-700 text-sm">
                  <th className="px-6 py-4 text-left">Student</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Domain</th>
                  <th className="px-6 py-4 text-left">Certificate ID</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {certs.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b hover:bg-emerald-50/60 transition duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white flex items-center justify-center font-bold shadow">
                          {c.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {c.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Student Record
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {c.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                        {c.domain}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-emerald-600 font-semibold">
                        {c.certificateId}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => updateCert(c)}
                          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-md transition duration-300 hover:scale-105"
                        >
                          <FiEdit />
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCert(c._id)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition duration-300 hover:scale-105"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-5 p-5 lg:hidden">
            {certs.map((c) => (
              <div
                key={c._id}
                className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* TOP */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white flex items-center justify-center font-bold shadow">
                      {c.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {c.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Student Certificate
                      </p>
                    </div>
                  </div>

                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-mono">
                    {c.certificateId}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FiMail className="text-cyan-600" />
                    {c.email}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FiFileText className="text-emerald-600" />
                    {c.domain}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => updateCert(c)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <FiEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCert(c._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {certs.length === 0 && (
            <div className="py-20 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiFileText className="text-4xl text-emerald-600" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Certificates Found
              </h3>

              <p className="text-gray-400 mt-2">
                Upload certificates to start managing records.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-5">
              <h3 className="text-white text-xl font-semibold">
                Edit Certificate
              </h3>

              <p className="text-emerald-100 text-sm mt-1">
                Update certificate details
              </p>
            </div>

            {/* FORM */}
            <div className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Student Name"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Student Email"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                />

                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="Internship Domain"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditingCert(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                >
                  Cancel
                </button>

                <button
                  onClick={saveUpdate}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white font-semibold shadow-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}