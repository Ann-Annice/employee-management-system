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
        `https://employee-management-system-production-e08b.up.railway.app/api/departments/${id}`,
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
        `https://employee-management-system-production-e08b.up.railway.app/api/departments/${id}`,
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

          <p className="mt-5 text-lg font-semibold text-gray-700">
            Loading Department...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Edit Department
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Update department information and keep your organization structured.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-10 shadow-2xl">

          <form
            onSubmit={updateDepartment}
            className="space-y-8"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Department Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter department name"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter department description"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>

            <div className="flex flex-col gap-4 pt-4 md:flex-row">

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => router.push("/departments")}
                className="rounded-xl bg-gray-200 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-300"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}