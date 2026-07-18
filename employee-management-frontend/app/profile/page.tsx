"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProfileData {
  name: string;
  email: string;
  role: string;
  status: string;
  profileImage?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    role: "",
    status: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://employee-management-system-production-e08b.up.railway.app/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 p-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-pink-600">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Employee Information
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Avatar */}
        <div className="mb-10 flex justify-center">
          {profile.profileImage ? (
            <img
              src={`https://employee-management-system-production-e08b.up.railway.app${profile.profileImage}`}
              alt={profile.name}
              className="h-36 w-36 rounded-full border-4 border-pink-500 object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-5xl font-bold text-white">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "E"}
            </div>
          )}
        </div>

        {/* Profile Cards */}
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-pink-50 p-6">
            <p className="text-gray-500">Name</p>

            <h2 className="mt-2 text-2xl font-bold">
              {profile.name}
            </h2>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <p className="text-gray-500">Email</p>

            <h2 className="mt-2 text-2xl font-bold">
              {profile.email}
            </h2>
          </div>

          <div className="rounded-2xl bg-purple-50 p-6">
            <p className="text-gray-500">Role</p>

            <h2 className="mt-2 text-2xl font-bold text-purple-600">
              {profile.role.replace("_", " ")}
            </h2>
          </div>

          <div className="rounded-2xl bg-green-50 p-6">
            <p className="text-gray-500">Status</p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {profile.status}
            </h2>
          </div>

        </div>

      </div>
    </main>
  );
}