"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddDepartmentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
        "https://employee-management-system-production-e08b.up.railway.app/api/departments",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Department created successfully");

      router.push("/departments");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white rounded shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Department
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="name"
            placeholder="Department Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="description"
            placeholder="Department Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              {loading
                ? "Creating..."
                : "Create Department"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/departments")}
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