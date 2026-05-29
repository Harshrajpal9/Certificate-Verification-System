import { useState } from "react";
import * as XLSX from "xlsx";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";

import Navbar from "./Navbar";

export default function UploadExcel() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.readAsArrayBuffer(selected);

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, {
        type: "buffer",
      });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet, { raw: true, defval: "" });

      const formatDate = (value) => {
        if (!value) return value;

        // If Excel gives proper Date object
        if (value instanceof Date) {
          const day = String(value.getDate()).padStart(2, "0");
          const month = String(value.getMonth() + 1).padStart(2, "0");
          const year = value.getFullYear();

          return `${day}-${month}-${year}`;
        }

        // If Excel gives number format
        if (typeof value === "number") {
          const date = XLSX.SSF.parse_date_code(value);
          if (!date) return value;

          return `${String(date.d).padStart(2, "0")}-${String(date.m).padStart(
            2,
            "0"
          )}-${date.y}`;
        }

        // If string (already formatted)
        if (typeof value === "string") {
          return value.replace(/\//g, "-");
        }

        return value;
      };

      const formattedData = data.map((row) => ({
        ...row,
        IssueDate: formatDate(row.IssueDate),
        StartDate: formatDate(row.StartDate),
        EndDate: formatDate(row.EndDate),
      }));

      setPreview(formattedData);
    };
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/upload-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { inserted, updated, total } = res.data;

      // TOAST LOGIC
      if (inserted === 0 && updated === 0) {
        toast("No new changes found", {
          icon: "ℹ️",
        });
      } else if (inserted > 0 && updated === 0) {
        toast.success(`${inserted} record(s) inserted successfully 🎉`);
      } else if (inserted === 0 && updated > 0) {
        toast.success(`${updated} record(s) updated 🔄`);
      } else {
        toast.success(
          `${inserted} inserted, ${updated} updated (Total: ${total}) 🚀`
        );
      }

      setPreview([]);
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Upload failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 transition hover:shadow-2xl">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Upload Student Data
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Upload bulk student records via Excel. Data is securely stored in
              MongoDB.
            </p>
          </div>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
            <input
              type="file"
              onChange={handleFile}
              className="hidden"
              id="fileUpload"
            />

            <label
              htmlFor="fileUpload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <FiUploadCloud size={40} className="text-gray-500" />

              <p className="text-gray-600 font-medium">
                Click to upload Excel file
              </p>

              <p className="text-xs text-gray-400">(.xlsx, .xls supported)</p>

              {file && (
                <p className="text-green-600 mt-2 text-sm font-medium">
                  {file.name}
                </p>
              )}
            </label>
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                📄 Preview Data
              </h3>

              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-200">
                    <tr>
                      {Object.keys(preview[0]).map((key) => (
                        <th key={key} className="p-3 font-medium">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="p-3">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Upload Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  <FiCheckCircle size={18} />
                  Confirm Upload
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {preview.length === 0 && (
            <div className="text-center text-gray-400 mt-6 text-sm">
              No data preview yet. Upload an Excel file to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
