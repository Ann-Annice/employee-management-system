"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Department {
  id: string;
  name: string;
}

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "ACTIVE",
    departmentId: "",
    managerId: "",
  });

  useEffect(() => {
    if (id) {
      fetchEmployee();
      fetchDepartments();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const emp = res.data.data;

      setForm({
        employeeId: emp.employeeId,
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        designation: emp.designation,
        salary: emp.salary.toString(),
        joiningDate: emp.joiningDate.split("T")[0],
        status: emp.status,
        departmentId: emp.departmentId,
        managerId: emp.managerId || "",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Unable to load employee");
    }
  };

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
    }
  };

 const updateEmployee = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const payload = {
      ...form,
      salary: Number(form.salary),
      managerId: form.managerId || null,
    };

    console.log("Updating Employee:", payload);

    const res = await axios.put(
      `http://localhost:5000/api/employees/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Update Success:", res.data);

    alert("Employee updated successfully");

    router.push("/employees");
  } catch (error: any) {
    console.error("Update Error:", error);

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    alert(error.response?.data?.message || "Update failed");
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
 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Employee
        </h1>

        <form
          onSubmit={updateEmployee}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-3 rounded"
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded"
          />

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="border p-3 rounded"
          />

          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <select
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option
                key={dept.id}
                value={dept.id}
              >
                {dept.name}
              </option>
            ))}
          </select>

          <input
            name="managerId"
            value={form.managerId}
            onChange={handleChange}
            placeholder="Manager ID"
            className="border p-3 rounded"
          />

          <div className="col-span-2 flex gap-4 mt-5">

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={() => router.push("/employees")}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}