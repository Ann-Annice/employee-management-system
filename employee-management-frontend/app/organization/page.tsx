"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  role: string;
  department?: {
    name: string;
  };
  reportees?: Employee[];
}

export default function OrganizationPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/employees/organization/tree",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load organization tree");
    } finally {
      setLoading(false);
    }
  };

  const renderEmployee = (
    employee: Employee,
    level = 0
  ) => (
    <div
      key={employee.id}
      className={`${level > 0 ? "ml-12 mt-6 border-l-2 border-pink-300 pl-8" : "mb-8"}`}
    >
      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              {employee.name}
            </h2>

            <p className="mt-1 text-gray-500">
              {employee.employeeId}
            </p>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold text-white ${
              employee.role === "SUPER_ADMIN"
                ? "bg-red-600"
                : employee.role === "HR_MANAGER"
                ? "bg-purple-600"
                : "bg-blue-600"
            }`}
          >
            {employee.role.replace("_", " ")}
          </span>

        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Designation
            </p>

            <p className="font-semibold">
              {employee.designation}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p className="font-semibold">
              {employee.department?.name}
            </p>
          </div>

        </div>

      </div>

      {employee.reportees &&
        employee.reportees.length > 0 && (
          <div className="mt-6">
            {employee.reportees.map((emp) =>
              renderEmployee(emp, level + 1)
            )}
          </div>
        )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        Loading Organization Tree...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              🌳 Organization Tree
            </h1>

            <p className="mt-2 text-gray-500">
              Reporting hierarchy of your organization
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Dashboard
          </Link>

        </div>

        {employees.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">

            <h2 className="text-2xl font-bold">
              No Employees Found
            </h2>

          </div>
        ) : (
          employees.map((employee) =>
            renderEmployee(employee)
          )
        )}

      </div>

    </main>
  );
}