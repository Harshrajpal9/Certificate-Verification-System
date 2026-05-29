import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

import {
  FaUsers,
  FaCertificate,
  FaDownload,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    certificates: 0,
    downloads: 0,
    verified: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log("Stats error");
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers size={24} />,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      title: "Certificates",
      value: stats.certificates,
      icon: <FaCertificate size={24} />,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Verified",
      value: stats.verified,
      icon: <FaCheckCircle size={24} />,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
    },
    {
      title: "Downloads",
      value: stats.downloads,
      icon: <FaDownload size={24} />,
      color: "from-orange-500 to-yellow-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h2>
       

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage certificates, monitor activities and track verification stats
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 relative overflow-hidden`}
            >
              {/* TOP BAR */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
              ></div>

              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.color} 
                text-white flex items-center justify-center shadow-md`}
              >
                {card.icon}
              </div>

              {/* TEXT */}
              <div className="mt-5">
                <p className="text-sm text-gray-500 font-medium">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  {card.value}
                </h2>
              </div>

              {/* BACKGROUND CIRCLE */}
              <div
                className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-r ${card.color} opacity-10`}
              ></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}