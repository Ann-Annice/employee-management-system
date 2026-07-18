"use client";

import Link from "next/link";

export default function LeavePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">

      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-pink-600">
              Leave Requests
            </h1>

            <p className="mt-2 text-gray-500">
              Apply for leave and track your requests
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Apply Leave */}

        <div className="rounded-3xl bg-pink-50 p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Apply for Leave
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Leave Type
              </label>

              <select className="w-full rounded-xl border p-3 outline-none focus:border-pink-500">

                <option>Annual Leave</option>

                <option>Sick Leave</option>

                <option>Casual Leave</option>

                <option>Work From Home</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Reason
              </label>

              <input
                type="text"
                placeholder="Reason for leave"
                className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                From Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                To Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
              />

            </div>

          </div>

          <button className="mt-8 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105">

            Submit Request

          </button>

        </div>

        {/* Leave History */}

        <div className="mt-12">

          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            My Leave History
          </h2>

          <div className="overflow-hidden rounded-2xl shadow-lg">

            <table className="w-full">

              <thead className="bg-pink-100">

                <tr>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    From
                  </th>

                  <th className="p-4 text-left">
                    To
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b">

                  <td className="p-4">
                    Annual Leave
                  </td>

                  <td className="p-4">
                    20 Jul 2026
                  </td>

                  <td className="p-4">
                    22 Jul 2026
                  </td>

                  <td className="p-4 font-semibold text-yellow-600">
                    Pending
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="p-4">
                    Sick Leave
                  </td>

                  <td className="p-4">
                    10 Jul 2026
                  </td>

                  <td className="p-4">
                    11 Jul 2026
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    Approved
                  </td>

                </tr>

                <tr>

                  <td className="p-4">
                    Casual Leave
                  </td>

                  <td className="p-4">
                    02 Jul 2026
                  </td>

                  <td className="p-4">
                    02 Jul 2026
                  </td>

                  <td className="p-4 font-semibold text-red-600">
                    Rejected
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}