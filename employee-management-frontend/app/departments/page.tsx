"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Building2,
  FileText,
  Pencil,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole === "EMPLOYEE") {
      window.location.href = "/dashboard";
      return;
    }

    setRole(userRole || "");
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id: string) => {
    if (!confirm("Delete this department?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100">
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <p className="mt-5 text-lg font-semibold">
            Loading Departments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <h1 className="text-5xl font-extrabold text-gray-800">
              Departments
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              Manage all company departments.
            </p>

          </div>

          <div className="flex gap-4">

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold shadow-lg transition hover:scale-105"
            >
              <ArrowLeft size={20} />
              Dashboard
            </Link>

            {(role === "SUPER_ADMIN" ||
              role === "HR_MANAGER") && (
              <Link
                href="/departments/add"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-xl transition hover:scale-105"
              >
                <Plus size={20} />
                Add Department
              </Link>
            )}

          </div>

        </div>

        {/* Cards */}

        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <Building2
              size={50}
              className="text-pink-600"
            />

            <p className="mt-5 text-gray-500">
              Total Departments
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {departments.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <FileText
              size={50}
              className="text-blue-600"
            />

            <p className="mt-5 text-gray-500">
              Department Records
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {departments.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <Building2
              size={50}
              className="text-purple-600"
            />

            <p className="mt-5 text-gray-500">
              Active Departments
            </p>

            <h2 className="mt-2 text-5xl font-bold text-green-600">
              {departments.length}
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">

              <tr>

                <th className="p-5 text-left">
                  Department
                </th>

                <th className="p-5 text-left">
                  Description
                </th>

                <th className="p-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {departments.length === 0 ? (
                <tr>

                  <td
                    colSpan={3}
                    className="p-10 text-center text-gray-500"
                  >
                    No departments found.
                  </td>

                </tr>
              ) : (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="border-b transition hover:bg-pink-50"
                  >

                    <td className="p-5 font-semibold">

                      <div className="flex items-center gap-3">

                        <div className="rounded-full bg-pink-100 p-3">

                          <Building2
                            className="text-pink-600"
                            size={22}
                          />

                        </div>

                        {dept.name}

                      </div>

                    </td>

                    <td className="p-5 text-gray-600">
                      {dept.description}
                    </td>

                    <td className="p-5 text-center">

                      {(role === "SUPER_ADMIN" ||
                        role === "HR_MANAGER") && (

                        <Link
                          href={`/departments/edit/${dept.id}`}
                          className="mr-3 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
                        >
                          <Pencil size={18} />
                          Edit
                        </Link>

                      )}

                      {role === "SUPER_ADMIN" && (

                        <button
                          onClick={() => deleteDepartment(dept.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>

                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}