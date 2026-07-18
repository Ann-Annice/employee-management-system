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
  const [profileImage, setProfileImage] = useState<File | null>(null);

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
  role: "EMPLOYEE",
  status: "ACTIVE",
});

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "EMPLOYEE") {
      router.push("/dashboard");
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const employeeRes = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/employees",
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

      const departmentRes = await axios.get(
        "https://employee-management-system-production-e08b.up.railway.app/api/departments",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

      const formData = new FormData();

      formData.append("employeeId", form.employeeId);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("phone", form.phone);
      formData.append("designation", form.designation);
      formData.append("salary", form.salary);
      formData.append("joiningDate", form.joiningDate);
      formData.append("departmentId", form.departmentId);
      formData.append("role", form.role);
      formData.append("status", form.status);

      if (form.managerId) {
        formData.append("managerId", form.managerId);
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.post(
        "https://employee-management-system-production-e08b.up.railway.app/api/auth/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-50 to-cyan-100 p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-10 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold text-slate-800">
      Add Employee
    </h1>

    <p className="mt-2 text-gray-500">
      Fill in the employee details to create a new account.
    </p>
  </div>

  <button
    type="button"
    onClick={() => router.push("/employees")}
    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    Back
  </button>
</div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <input
            name="employeeId"
            placeholder="Employee ID"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="name"
            placeholder="Name"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
           className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            name="joiningDate"
            type="date"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <select
            name="departmentId"
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
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
          <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="rounded-xl border border-gray-300 bg-gray-50 p-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
>
  <option value="EMPLOYEE">Employee</option>
  <option value="HR_MANAGER">HR Manager</option>
  <option value="SUPER_ADMIN">Super Admin</option>
</select>
<select
  name="status"
  value={form.status}
  onChange={handleChange}
  className="rounded border p-3"
>
  <option value="ACTIVE">Active</option>
  <option value="INACTIVE">Inactive</option>
</select>

          <div className="col-span-2">
            <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setProfileImage(
      e.target.files ? e.target.files[0] : null
    )
  }
  className="w-full rounded-xl border border-dashed border-gray-400 bg-gray-50 p-4"
/>
{profileImage && (
  <p className="mt-3 text-sm text-green-600">
    Selected: {profileImage.name}
  </p>
)}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfileImage(
                  e.target.files
                    ? e.target.files[0]
                    : null
                )
              }
              className="w-full rounded border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700"
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