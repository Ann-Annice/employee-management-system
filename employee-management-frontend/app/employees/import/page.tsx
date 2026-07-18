"use client";

import { useState } from "react";

export default function ImportEmployees() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) {
      alert("Please choose a CSV file");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(
        "https://employee-management-system-production-e08b.up.railway.app/api/employees/import",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      alert(data.message);
    } catch (err) {
      alert("Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">
        Import Employees
      </h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={handleImport}
        className="mt-6 rounded bg-blue-600 px-6 py-3 text-white"
      >
        {loading ? "Importing..." : "Import CSV"}
      </button>
    </div>
  );
}