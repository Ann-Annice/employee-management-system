"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const fetchDepartment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        name: res.data.data.name,
        description: res.data.data.description,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Unable to load department");
    }
  };

  const updateDepartment = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/departments/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Department updated successfully");

      router.push("/departments");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white rounded shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Department
        </h1>

        <form
          onSubmit={updateDepartment}
          className="space-y-5"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Department Name"
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Department Description"
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Update Department
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