"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: string;
  department: {
    name: string;
  };
  manager: {
    name: string;
  } | null;
}

export default function EmployeeDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Employee ID:", id);
      console.log(
        "Request URL:",
        `http://localhost:5000/api/employees/${id}`
      );

      const res = await axios.get(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.data);

      setEmployee(res.data.data);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }

      alert("Unable to load employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Employee not found
        </h1>

        <button
          onClick={() => router.push("/employees")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Employee Details
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Employee ID</strong>
            <p>{employee.employeeId}</p>
          </div>

          <div>
            <strong>Name</strong>
            <p>{employee.name}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{employee.email}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{employee.phone}</p>
          </div>

          <div>
            <strong>Designation</strong>
            <p>{employee.designation}</p>
          </div>

          <div>
            <strong>Salary</strong>
            <p>₹{employee.salary}</p>
          </div>

          <div>
            <strong>Department</strong>
            <p>{employee.department.name}</p>
          </div>

          <div>
            <strong>Manager</strong>
            <p>{employee.manager?.name || "No Manager"}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{employee.status}</p>
          </div>

          <div>
            <strong>Joining Date</strong>
            <p>{new Date(employee.joiningDate).toLocaleDateString()}</p>
          </div>

        </div>

        <button
          onClick={() => router.push("/employees")}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Back to Employees
        </button>

      </div>
    </main>
  );
}