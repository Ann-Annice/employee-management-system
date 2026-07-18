"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { Cormorant_Garamond } from "next/font/google";
import {
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  totalHRManagers: number;
  activeEmployees: number;
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalDepartments: 0,
    totalHRManagers: 0,
    activeEmployees: 0,
  });

  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

// ADD THIS
const [profileImage, setProfileImage] = useState("");

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const chartData = {
  labels: ["Employees", "Active", "Departments", "HR Managers"],
  datasets: [
    {
      label: "Company Statistics",
      data: [
        stats.totalEmployees,
        stats.activeEmployees,
        stats.totalDepartments,
        stats.totalHRManagers,
      ],
      backgroundColor: [
        "#ec4899",
        "#22c55e",
        "#3b82f6",
        "#a855f7",
      ],
      borderRadius: 10,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

  

  useEffect(() => {
    const name = localStorage.getItem("employeeName");

    if (name) {
      setEmployeeName(name);
    }

    const userRole = localStorage.getItem("role");

    if (userRole) {
      setRole(userRole);
    }

    const savedTheme = localStorage.getItem("darkMode");

if (savedTheme === "true") {
  setDarkMode(true);
}
  // your greeting code continues here...
  const hour = new Date().getHours();

  if (hour < 12) {
    setGreeting("☀ Good Morning");
  } else if (hour < 17) {
    setGreeting("🌤 Good Afternoon");
  } else {
    setGreeting("🌙 Good Evening");
  }

  // your date code (if you have it)

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
      const profileRes = await axios.get(
  "http://localhost:5000/api/auth/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setProfileImage(profileRes.data.data.profileImage);
    } catch (error) {
      console.error(error);

      alert("Session expired. Please login again.");

      localStorage.clear();

      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-200">

        <div className="rounded-3xl bg-white/80 p-10 backdrop-blur-xl shadow-2xl">

          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

          <p className="mt-5 text-lg font-semibold text-gray-700">
            Loading Dashboard...
          </p>

        </div>

      </div>
    );
  }

  return (
   <main
  className={`flex min-h-screen ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100"
  }`}
>

      <Sidebar />

      <div
  className={`relative ml-72 flex-1 overflow-hidden ${
    darkMode ? "bg-gray-900" : ""
  }`}
>

        {/* Background Glow */}

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl"></div>

        <div className="absolute top-20 right-0 h-[450px] w-[450px] rounded-full bg-fuchsia-300/20 blur-3xl"></div>

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl"></div>

        <div className="relative z-10">

          {/* Header */}

          <header className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 shadow-xl">

           <div className="flex items-center justify-between px-10 py-8">
  <div>
    <h1 className="text-4xl font-extrabold text-white">
      Employee Management System
    </h1>

    <p className="mt-2 text-pink-100">
      Smart Employee Administration Portal
    </p>
  </div>

  <button
    onClick={() => {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
      localStorage.setItem("darkMode", String(newTheme));
    }}
    className="rounded-xl bg-white/20 px-5 py-3 text-white transition hover:bg-white/30"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>
</div>

          </header>

          <div className="mx-auto max-w-7xl px-10 py-10">

            {/* Welcome Card */}

          <h2
  className={`text-4xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  {greeting},
  <span className={darkMode ? "text-pink-400" : "text-pink-600"}>
    {employeeName || "Employee"}
  </span>
  👋
</h2>

<p className="mt-3 text-lg text-gray-600">
  Manage employees, departments and organization activities from one place.
</p>

<p className="mt-2 text-sm font-medium text-gray-500">
  Role: {role}
</p>
            {/* Profile */}

<div className="mt-16">

 <h2
  className={`mb-6 text-3xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  Profile
</h2>
  <div
  className={`rounded-3xl p-8 backdrop-blur-xl shadow-xl ${
    darkMode
      ? "bg-gray-800 border border-gray-700"
      : "bg-white/80 border border-pink-100"
  }`}
>

    <div className="flex flex-col items-center gap-6 md:flex-row">

      <div className="h-28 w-28 overflow-hidden rounded-full shadow-lg">

  {profileImage ? (

    <img
      src={`http://localhost:5000${profileImage}`}
      alt={employeeName}
      className="h-full w-full object-cover"
    />

  ) : (

    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-5xl font-bold text-white">

      {employeeName
        ? employeeName.charAt(0).toUpperCase()
        : "E"}

    </div>

  )}

</div>

      <div className="flex-1">

        <h2 className="text-3xl font-bold text-gray-800">
          {employeeName || "Employee"}
        </h2>

        <p className="mt-2 text-lg text-gray-500">
          Employee Management System
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-pink-50 p-4">

            <p className="text-gray-500">
              Role
            </p>

            <h3 className="mt-1 font-bold text-pink-600">
              {role.replace("_", " ")}
            </h3>

          </div>

          <div className="rounded-xl bg-purple-50 p-4">

            <p className="text-gray-500">
              Status
            </p>

            <h3 className="mt-1 font-bold text-green-600">
              Active
            </h3>

          </div>

          <div className="rounded-xl bg-blue-50 p-4">

            <p className="text-gray-500">
              Login
            </p>
<div className="rounded-xl bg-blue-50 p-4">
  <p className="text-gray-500">
    Today
  </p>

  <h3 className="text-xl font-semibold text-gray-700">
    {today}
  </h3>
</div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

           {/* Statistics */}

{(role === "SUPER_ADMIN" || role === "HR_MANAGER") && (

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  {/* Total Employees */}

  <div className="rounded-3xl bg-gradient-to-br from-pink-50 via-white to-rose-100 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-pink-300/50">

    <Users size={52} className="text-pink-600" />

    <p className="mt-6 text-gray-500">
      Total Employees
    </p>

    <h2 className="mt-2 text-5xl font-bold text-gray-800">
      {stats.totalEmployees}
    </h2>

  </div>

  {/* Departments */}

  <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-cyan-100 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-blue-300/50">

    <Building2 size={52} className="text-blue-600" />

    <p className="mt-6 text-gray-500">
      Departments
    </p>

    <h2 className="mt-2 text-5xl font-bold text-gray-800">
      {stats.totalDepartments}
    </h2>

  </div>

  {/* HR Managers */}

  <div className="rounded-3xl bg-gradient-to-br from-purple-50 via-white to-fuchsia-100 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-purple-300/50">

    <div className="text-5xl">👔</div>

    <p className="mt-6 text-gray-500">
      HR Managers
    </p>

    <h2 className="mt-2 text-5xl font-bold text-gray-800">
      {stats.totalHRManagers}
    </h2>

  </div>

  {/* Active Employees */}

  <div className="rounded-3xl bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-green-300/50">

   

    <p className="mt-6 text-gray-500">
      Active Employees
    </p>

    <h2 className="mt-2 text-5xl font-bold text-gray-800">
      {stats.activeEmployees}
    </h2>

  </div>

</div>

)}
             
          {/* Quick Actions - Super Admin Only */}

{role === "SUPER_ADMIN" && (

<div className="mt-14">

  <h2
  className={`mb-6 text-3xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  Quick Actions
</h2>

  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

    <Link
      href="/employees/add"
      className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">➕</div>

      <h3 className="mt-4 text-xl font-bold">
        Add Employee
      </h3>

      <p className="mt-2 text-pink-100">
        Register a new employee.
      </p>
    </Link>

    <Link
      href="/employees"
      className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">👥</div>

      <h3 className="mt-4 text-xl font-bold">
        Employees
      </h3>

      <p className="mt-2 text-blue-100">
        View employee information.
      </p>
    </Link>

    <Link
      href="/departments"
      className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">🏢</div>

      <h3 className="mt-4 text-xl font-bold">
        Departments
      </h3>

      <p className="mt-2 text-purple-100">
        Manage all departments.
      </p>
    </Link>

    <Link
      href="/organization"
      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">🌳</div>

      <h3 className="mt-4 text-xl font-bold">
        Organization Tree
      </h3>

      <p className="mt-2 text-green-100">
        View reporting hierarchy.
      </p>
    </Link>

  </div>

</div>

)}
{/* Employee Workspace */}

{role === "EMPLOYEE" && (

<div className="mt-14">

  <h2 className="mb-6 text-3xl font-bold text-gray-800">
    My Workspace
  </h2>

  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

    <Link
      href="/profile"
      className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">👤</div>

      <h3 className="mt-4 text-xl font-bold">
        My Profile
      </h3>

      <p className="mt-2 text-pink-100">
        View and update your profile.
      </p>
    </Link>

    <Link
      href="/attendance"
      className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">📅</div>

      <h3 className="mt-4 text-xl font-bold">
        Attendance
      </h3>

      <p className="mt-2 text-blue-100">
        Check your attendance history.
      </p>
    </Link>

    <Link
      href="/leave"
      className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">📝</div>

      <h3 className="mt-4 text-xl font-bold">
        Leave Requests
      </h3>

      <p className="mt-2 text-purple-100">
        Apply and track leave requests.
      </p>
    </Link>

    <Link
      href="/announcements"
      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-xl transition hover:scale-105"
    >
      <div className="text-4xl">📢</div>

      <h3 className="mt-4 text-xl font-bold">
        Announcements
      </h3>

      <p className="mt-2 text-green-100">
        Read the latest company updates.
      </p>
    </Link>

  </div>

</div>

)}
{/* Recent Activity */}

<div className="mt-16">

  <h2
  className={`mb-6 text-3xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  Recent Activity
</h2>

  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-pink-100 p-8">

    <div className="space-y-6">

      <div className="flex items-center justify-between border-b pb-4">

        <div>

          <h3 className="font-semibold text-gray-800">
            Employee Added
          </h3>

          <p className="text-gray-500">
            A new employee was added to the organization.
          </p>

        </div>

        <span className="rounded-full bg-green-100 px-4 py-1 text-green-700 text-sm">
          Just now
        </span>

      </div>

      <div className="flex items-center justify-between border-b pb-4">

        <div>

          <h3 className="font-semibold text-gray-800">
            Department Updated
          </h3>

          <p className="text-gray-500">
            Department information was modified.
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-blue-700 text-sm">
          Today
        </span>

      </div>

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-semibold text-gray-800">
            Employee Status Changed
          </h3>

          <p className="text-gray-500">
            Employee status updated successfully.
          </p>

        </div>

        <span className="rounded-full bg-purple-100 px-4 py-1 text-purple-700 text-sm">
          Yesterday
        </span>

      </div>

    </div>

  </div>

</div>
{/* Company Overview */}

<div className="mt-16">

 <h2
  className={`mb-6 text-3xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  Company Overview
</h2>

  <div className="grid gap-6 lg:grid-cols-3">

    <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-white shadow-xl">
      <p className="text-pink-100">
        Employee Growth
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        +18%
      </h2>

      <p className="mt-4">
        Compared to last month
      </p>
    </div>

    <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-fuchsia-600 p-8 text-white shadow-xl">
      <p className="text-purple-100">
        Departments
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {stats.totalDepartments}
      </h2>

      <p className="mt-4">
        Active business units
      </p>
    </div>

    <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white shadow-xl">
      <p className="text-blue-100">
        System Status
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Online
      </h2>

      <p className="mt-4">
        All services are running normally
      </p>
    </div>

  </div>

</div>
<div className="mt-16 rounded-3xl bg-white p-8 shadow-xl">
  <h2 className="mb-6 text-3xl font-bold text-gray-800">
    Employee Statistics
  </h2>

  <Bar
    data={chartData}
    options={chartOptions}
  />
</div>


            {/* Explore */}

<div className="mt-16">

  <h2
  className={`mb-6 text-3xl font-bold ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
  Explore
</h2>

  <div className="grid gap-8 md:grid-cols-2">

    {/* SUPER ADMIN */}

    {role === "SUPER_ADMIN" && (
      <>

        <Link
          href="/employees"
          className="group rounded-3xl border border-pink-100 bg-white/75 p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg">
            <Users size={40} />
          </div>

          <h3 className="mt-8 text-3xl font-bold text-gray-800">
            Employees
          </h3>

          <p className="mt-4 text-lg text-gray-600 leading-7">
            View, edit, update employee profiles, assign managers and manage your workforce.
          </p>

          <div className="mt-8 flex items-center gap-2 text-lg font-semibold text-pink-600">
            Open Employees
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </div>
        </Link>

        <Link
          href="/departments"
          className="group rounded-3xl border border-pink-100 bg-white/75 p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-lg">
            <Building2 size={40} />
          </div>

          <h3 className="mt-8 text-3xl font-bold text-gray-800">
            Departments
          </h3>

          <p className="mt-4 text-lg text-gray-600 leading-7">
            Create, edit and organize departments with a beautiful management interface.
          </p>

          <div className="mt-8 flex items-center gap-2 text-lg font-semibold text-purple-600">
            Open Departments
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </div>
        </Link>

      </>
    )}

  </div>

</div>

</div>

</div>

</div>

</main>
);
}

           