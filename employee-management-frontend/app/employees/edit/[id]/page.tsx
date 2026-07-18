"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface Department {
  id: string;
  name: string;
}

interface Manager {
  id: string;
  name: string;
}

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);

  const [profileImage, setProfileImage] =
    useState<File | null>(null);

  const [currentImage, setCurrentImage] =
    useState("");

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
    const currentRole =
      localStorage.getItem("role") || "";

    const currentUserId =
      localStorage.getItem("userId") || "";

    setRole(currentRole);
    setUserId(currentUserId);

    if (id) {
      fetchEmployee(currentRole, currentUserId);
      fetchDepartments();
      fetchManagers();
    }
  }, [id]);

  const fetchEmployee = async (
    currentRole: string,
    currentUserId: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `https://employee-management-system-production-e08b.up.railway.app/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const emp = res.data.data;

      if (
        currentRole === "EMPLOYEE" &&
        emp.id !== currentUserId
      ) {
        alert("Access Denied");
        router.push("/employees");
        return;
      }

      setCurrentImage(emp.profileImage || "");

      setForm({
        employeeId: emp.employeeId || "",
        name: emp.name || "",
        email: emp.email || "",
        phone: emp.phone || "",
        designation: emp.designation || "",
        salary: String(emp.salary || ""),
        joiningDate:
          emp.joiningDate?.split("T")[0] || "",
        status: emp.status || "ACTIVE",
        departmentId:
          emp.departmentId || "",
        managerId: emp.managerId || "",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Unable to load employee");
      router.push("/employees");
    }
  };

  const fetchDepartments = async () => {
    try {
      const token =
        localStorage.getItem("token");

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

  const fetchManagers = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setManagers(
        res.data.data.employees.map(
          (emp: any) => ({
            id: emp.id,
            name: emp.name,
          })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
<div className="col-span-full">
  <label className="mb-2 block text-lg font-semibold text-gray-700">
    Profile Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setProfileImage(
        e.target.files ? e.target.files[0] : null
      )
    }
    className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"
  />

  {profileImage && (
    <p className="mt-2 text-green-600">
      Selected: {profileImage.name}
    </p>
  )}
</div>

   const updateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("employeeId", form.employeeId);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("designation", form.designation);
      formData.append("salary", form.salary);
      formData.append("joiningDate", form.joiningDate);
      formData.append("status", form.status);
      formData.append("departmentId", form.departmentId);

      if (form.managerId) {
        formData.append("managerId", form.managerId);
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.put(
        `https://employee-management-system-production-e08b.up.railway.app/api/employees/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Employee updated successfully");
      router.push("/employees");
    } catch (error: any) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 py-10 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8">
          <h1 className="text-4xl font-bold text-white">
            ✏️ Edit Employee
          </h1>
          <p className="mt-2 text-indigo-100">
            Update employee details and profile.
          </p>
        </div>

        <form
          onSubmit={updateEmployee}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >
          <input
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Employee Name"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <select
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <input
            name="managerId"
            value={form.managerId}
            onChange={handleChange}
            placeholder="Manager ID"
            className="rounded-xl border p-4 focus:border-indigo-500 focus:outline-none"
          />

          <div className="col-span-full">
            <label className="mb-2 block text-lg font-semibold text-gray-700">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfileImage(
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"
            />

            {profileImage && (
              <p className="mt-2 text-green-600">
                Selected: {profileImage.name}
              </p>
            )}
          </div>

          <div className="col-span-full flex gap-5 pt-6">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
            >
              💾 Update Employee
            </button>

            <button
              type="button"
              onClick={() => router.push("/employees")}
              className="flex-1 rounded-xl bg-gray-700 py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}