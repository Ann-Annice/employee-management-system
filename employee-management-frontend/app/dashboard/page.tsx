"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  totalDepartments: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalDepartments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/";
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-700 shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-3xl font-bold text-white">
            Employee Management Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Welcome 👋
        </h2>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl">👥</div>

            <p className="text-gray-500 mt-4">
              Total Employees
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalEmployees}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl">🏢</div>

            <p className="text-gray-500 mt-4">
              Total Departments
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.totalDepartments}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl">✅</div>

            <p className="text-gray-500 mt-4">
              Active Employees
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {stats.activeEmployees}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl">❌</div>

            <p className="text-gray-500 mt-4">
              Inactive Employees
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {stats.inactiveEmployees}
            </h2>
          </div>

        </div>

        {/* Explore */}

        <div className="flex justify-center mt-16">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">

            <Link
              href="/employees"
              className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-200"
            >
              <div className="text-7xl mb-5">
                👨‍💼
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Employees
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                View, edit and manage employees.
              </p>
            </Link>

            <Link
              href="/departments"
              className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-200"
            >
              <div className="text-7xl mb-5">
                🏢
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Departments
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Create, edit and manage departments.
              </p>
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}