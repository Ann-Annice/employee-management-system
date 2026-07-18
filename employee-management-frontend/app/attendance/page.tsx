"use client";

import Link from "next/link";

export default function AttendancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">

      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-pink-600">
              Attendance
            </h1>

            <p className="mt-2 text-gray-500">
              View your attendance details
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Today's Attendance */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-green-50 p-6 shadow">
            <p className="text-gray-500">
              Today's Status
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              Present
            </h2>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6 shadow">
            <p className="text-gray-500">
              Check In
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              09:05 AM
            </h2>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6 shadow">
            <p className="text-gray-500">
              Check Out
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              06:10 PM
            </h2>
          </div>

          <div className="rounded-2xl bg-pink-50 p-6 shadow">
            <p className="text-gray-500">
              Working Hours
            </p>

            <h2 className="mt-2 text-3xl font-bold text-pink-600">
              09h 05m
            </h2>
          </div>

        </div>

        {/* Attendance History */}

        <div className="mt-12">

          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Attendance History
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-white shadow">

            <table className="w-full">

              <thead className="bg-pink-100">

                <tr>

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Check In
                  </th>

                  <th className="p-4 text-left">
                    Check Out
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-t">
                  <td className="p-4">17 Jul 2026</td>
                  <td className="p-4 text-green-600 font-semibold">Present</td>
                  <td className="p-4">09:05 AM</td>
                  <td className="p-4">06:10 PM</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">16 Jul 2026</td>
                  <td className="p-4 text-green-600 font-semibold">Present</td>
                  <td className="p-4">09:00 AM</td>
                  <td className="p-4">06:00 PM</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">15 Jul 2026</td>
                  <td className="p-4 text-red-600 font-semibold">Leave</td>
                  <td className="p-4">-</td>
                  <td className="p-4">-</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">14 Jul 2026</td>
                  <td className="p-4 text-green-600 font-semibold">Present</td>
                  <td className="p-4">09:10 AM</td>
                  <td className="p-4">06:05 PM</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}