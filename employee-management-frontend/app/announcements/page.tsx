"use client";

import Link from "next/link";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">

      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl">

        {/* Header */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-pink-600">
              Company Announcements
            </h1>

            <p className="mt-2 text-gray-500">
              Stay updated with the latest company news.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Announcement Cards */}

        <div className="space-y-6">

          <div className="rounded-2xl border-l-8 border-pink-500 bg-pink-50 p-6 shadow-lg">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-pink-600">
                🎉 Independence Day Holiday
              </h2>

              <span className="rounded-full bg-pink-500 px-4 py-1 text-sm font-semibold text-white">
                New
              </span>

            </div>

            <p className="mt-3 text-gray-700 leading-7">
              The office will remain closed on
              <strong> 15 August </strong>
              in celebration of Independence Day.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Posted: 17 Jul 2026
            </p>

          </div>

          <div className="rounded-2xl border-l-8 border-purple-500 bg-purple-50 p-6 shadow-lg">

            <h2 className="text-2xl font-bold text-purple-600">
              💰 Salary Credited
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              Salaries for this month have been successfully credited to all employees.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Posted: 15 Jul 2026
            </p>

          </div>

          <div className="rounded-2xl border-l-8 border-blue-500 bg-blue-50 p-6 shadow-lg">

            <h2 className="text-2xl font-bold text-blue-600">
              📢 HR Policy Update
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              The Leave Policy has been updated. Please review the latest HR guidelines before submitting leave requests.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Posted: 12 Jul 2026
            </p>

          </div>

          <div className="rounded-2xl border-l-8 border-green-500 bg-green-50 p-6 shadow-lg">

            <h2 className="text-2xl font-bold text-green-600">
              🤝 Team Meeting
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              A company-wide meeting is scheduled for Friday at 10:00 AM in the Conference Hall. Attendance is mandatory.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Posted: 10 Jul 2026
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}