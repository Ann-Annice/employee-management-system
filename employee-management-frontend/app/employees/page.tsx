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
  role: string;
  department: {
    id: string;
    name: string;
  };
  manager: {
    name: string;
  } | null;
}

interface Department {
  id: string;
  name: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("");

  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  // Initial Load
  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole === "EMPLOYEE") {
      window.location.href = "/dashboard";
      return;
    }

    setRole(userRole || "");
    setUserId(localStorage.getItem("userId") || "");

    fetchDepartments();
  }, []);

  // Reset page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, departmentId, roleFilter, statusFilter, sort]);

  // Fetch employees
  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole === "EMPLOYEE") return;

    fetchEmployees();
  }, [
    page,
    search,
    departmentId,
    roleFilter,
    statusFilter,
    sort,
  ]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit,
            search,
            departmentId,
            role: roleFilter,
            status: statusFilter,
            sort,
          },
        }
      );

      setEmployees(res.data.data.employees);
      setTotal(res.data.data.total);
      setTotalPages(
        Math.ceil(res.data.data.total / res.data.data.limit)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://employee-management-system-production-e08b.up.railway.app/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

 if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

        <p className="mt-5 text-lg font-semibold text-gray-700">
          Loading Employees...
        </p>
      </div>
    </div>
  );
}

return (
  <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-8">

    <div className="mx-auto max-w-7xl">

      {/* Header */}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-5xl font-extrabold text-gray-800">
            Employee Management
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Manage employees, departments and organization efficiently.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Total Employees :
            <span className="ml-2 font-bold text-pink-600">
              {total}
            </span>
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Dashboard
          </Link>

          {(role === "SUPER_ADMIN" ||
            role === "HR_MANAGER") && (
            <Link
              href="/employees/add"
              className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              + Add Employee
            </Link>
          )}

        </div>

      </div>

      {/* Search */}

      <div className="rounded-3xl bg-white p-6 shadow-xl">

        <input
          type="text"
          placeholder="Search by Name, Email or Employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-pink-500"
        />

        {/* Filters */}

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Departments</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}

          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="HR_MANAGER">HR Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Newest</option>
            <option value="name">Name (A-Z)</option>
            <option value="salary">Salary</option>
            <option value="joiningDate">Joining Date</option>
          </select>

        </div>

      </div>

      {/* Employee Table */}

      <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-2xl"></div>


        <table className="min-w-full">

  <thead className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">

    <tr>
      <th className="px-6 py-4 text-left">Employee ID</th>
      <th className="px-6 py-4 text-left">Name</th>
      <th className="px-6 py-4 text-left">Email</th>
      <th className="px-6 py-4 text-left">Designation</th>
      <th className="px-6 py-4 text-left">Department</th>
      <th className="px-6 py-4 text-left">Status</th>
      <th className="px-6 py-4 text-left">Manager</th>
      <th className="px-6 py-4 text-center">Actions</th>
    </tr>

  </thead>

  <tbody>

    {employees.length === 0 ? (

      <tr>
        <td
          colSpan={8}
          className="py-10 text-center text-lg text-gray-500"
        >
          No employees found.
        </td>
      </tr>

    ) : (

      employees.map((emp) => {

        const canEdit =
          role === "SUPER_ADMIN" ||
          role === "HR_MANAGER" ||
          (role === "EMPLOYEE" && userId === emp.id);

        const canDelete =
          role === "SUPER_ADMIN";

        return (

          <tr
            key={emp.id}
            className="border-b transition hover:bg-pink-50"
          >

            <td className="px-6 py-4 font-semibold">
              {emp.employeeId}
            </td>

            <td className="px-6 py-4 font-medium">
              {emp.name}
            </td>

            <td className="px-6 py-4">
              {emp.email}
            </td>

            <td className="px-6 py-4">
              {emp.designation}
            </td>

            <td className="px-6 py-4">
              {emp.department.name}
            </td>

            <td className="px-6 py-4">

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  emp.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {emp.status}
              </span>

            </td>

            <td className="px-6 py-4">
              {emp.manager?.name || "-"}
            </td>

            <td className="px-6 py-4">

              <div className="flex justify-center gap-2">

                <Link
                  href={`/employees/${emp.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View
                </Link>

                {canEdit && (
                  <Link
                    href={`/employees/edit/${emp.id}`}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                )}

                {canDelete && (
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}

              </div>

            </td>

          </tr>

        );

      })

    )}

  </tbody>

</table>

       {/* Pagination */}

<div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-lg md:flex-row">

  <p className="text-gray-600">
    Showing page{" "}
    <span className="font-bold text-pink-600">
      {page}
    </span>{" "}
    of{" "}
    <span className="font-bold text-pink-600">
      {totalPages}
    </span>
  </p>

  <div className="flex items-center gap-3">

    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className={`rounded-xl px-5 py-2 font-semibold transition ${
        page === 1
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-pink-500 text-white hover:bg-pink-600"
      }`}
    >
      ← Previous
    </button>

    <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 font-bold text-white shadow">
      {page}
    </div>

    <button
      disabled={page === totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className={`rounded-xl px-5 py-2 font-semibold transition ${
        page === totalPages
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
    >
      Next →
    </button>

  </div>

</div>

</div>

</main>
);
}