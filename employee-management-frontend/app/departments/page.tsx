"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Department {
  id: string;
  name: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    const confirmDelete = confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

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
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Departments...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Departments
          </h1>

          <div className="flex gap-3">

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Dashboard
            </Link>

            <Link
              href="/departments/add"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Department
            </Link>

          </div>

        </div>

        <div className="bg-white rounded shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-4 text-left">
                  Department Name
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center p-8"
                  >
                    No departments found.
                  </td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {dept.name}
                    </td>

                    <td className="p-4">
                      {dept.description}
                    </td>

                    <td className="p-4 text-center">

                      <Link
                        href={`/departments/edit/${dept.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded mr-2"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteDepartment(dept.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                      >
                        Delete
                      </button>

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