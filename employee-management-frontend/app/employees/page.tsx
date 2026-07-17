"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  designation: string;
  status: string;
  department: {
    name: string;
  };
  manager: {
    name: string;
  } | null;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/employees?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(res.data.data.employees);
    } catch (error) {
      console.error(error);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee deleted successfully");

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Employees...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Employee Management
        </h1>

        <div className="flex gap-3">

          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Dashboard
          </Link>

          <Link
            href="/employees/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Employee
          </Link>

        </div>

      </div>

      <div className="bg-white p-4 rounded shadow mb-6">

        <input
          type="text"
          placeholder="Search by Name, Email or Employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded p-3"
        />

      </div>

      <div className="overflow-x-auto bg-white rounded shadow">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Manager</th>
              <th className="p-3 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="text-center p-8 text-gray-500"
                >
                  No employees found.
                </td>
              </tr>

            ) : (

              employees.map((emp) => (

                <tr
                  key={emp.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">{emp.employeeId}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.department.name}</td>

                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      {emp.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {emp.manager?.name || "No Manager"}
                  </td>

                  <td className="p-3 text-center">

                    <Link
                      href={`/employees/${emp.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <Link
                      href={`/employees/edit/${emp.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

    </main>
  );
}