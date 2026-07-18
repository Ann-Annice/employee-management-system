"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
 role: string;
  status: string;
  salary: number;
  joiningDate: string;

  profileImage?: string;
  managerId?: string | null;

  department: {
    name: string;
  };

  manager?: {
    name: string;
  } | null;
}

export default function EmployeeDetails() {
  const params = useParams<{ id: string }>();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchEmployee();
    }
  }, [params]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://employee-management-system-production-e08b.up.railway.app/api/employees/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployee(res.data.data);
      console.log("Employee Data:", res.data.data);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Unable to load employee.");
    } finally {
      setLoading(false);
    }
  };
  console.log("Employee State:", employee);
  console.log("Profile Image:", employee?.profileImage);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Employee not found.
      </div>
    );
  }

  return(
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">
            Employee Profile
          </h1>

          <Link
            href="/employees"
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Back
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg">
              {employee.profileImage ? (
               <img
  src={`https://employee-management-system-production-e08b.up.railway.app${employee.profileImage}?t=${Date.now()}`}
  alt={employee.name}
  className="h-full w-full object-cover"
  onError={(e) => {
    console.log("Image failed:", e.currentTarget.src);
  }}
/>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-5xl font-bold text-white">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-800">
                {employee.name}
              </h2>

              <p className="mt-2 text-lg text-gray-500">
                {employee.designation}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Info title="Employee ID" value={employee.employeeId} />
            <Info title="Email" value={employee.email} />
            <Info title="Phone" value={employee.phone} />
            <Info title="Role" value={employee.role} />
            <Info title="Status" value={employee.status} />
            <Info title="Salary" value={`₹${employee.salary}`} />
            <Info title="Department" value={employee.department.name} />
            <Info
              title="Manager"
              value={employee.manager?.name ?? "No Manager"}
            />
            <Info
              title="Joining Date"
              value={new Date(employee.joiningDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-xl font-bold text-gray-800">
        {value}
      </h3>
    </div>
  );
}