"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Department {
  id: string;
  name: string;
}

interface Manager {
  id: string;
  name: string;
}

export default function AddEmployeePage() {
  const router = useRouter();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    salary: "",
    joiningDate: "",
    departmentId: "",
    managerId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    // Get employees (for manager dropdown)
    const employeeRes = await axios.get(
      "http://localhost:5000/api/employees",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setManagers(
      employeeRes.data.data.employees.map((emp: any) => ({
        id: emp.id,
        name: emp.name,
      }))
    );

    // Get departments (for department dropdown)
    const departmentRes = await axios.get(
      "http://localhost:5000/api/departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDepartments(departmentRes.data.data);
  } catch (err) {
    console.error(err);
    alert("Failed to load data");
  }
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...form,
          salary: Number(form.salary),
          managerId:
            form.managerId === ""
              ? null
              : form.managerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee created successfully");

      router.push("/employees");
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="employeeId"
            placeholder="Employee ID"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="name"
            placeholder="Name"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="joiningDate"
            type="date"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="departmentId"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          >
            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept.id}
                value={dept.id}
              >
                {dept.name}
              </option>
            ))}
          </select>

          <select
            name="managerId"
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option value="">
              No Manager
            </option>

            {managers.map((manager) => (
              <option
                key={manager.id}
                value={manager.id}
              >
                {manager.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            {loading
              ? "Creating..."
              : "Create Employee"}
          </button>

        </form>

      </div>

    </main>
  );
}