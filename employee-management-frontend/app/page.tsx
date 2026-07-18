"use client";

import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Building2,
} from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "https://employee-management-system-production-e08b.up.railway.app/api/auth/login",
        form
      );

      const { token, employee } = res.data.data;
      console.log(employee);

      localStorage.setItem("token", token);
      localStorage.setItem("role", employee.role);
      localStorage.setItem("employeeName", employee.name);
      localStorage.setItem("email", employee.email);
      localStorage.setItem("userId", employee.id);

      window.location.href = "/dashboard";
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">

      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/15 p-8 shadow-2xl backdrop-blur-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
            <Building2
              size={42}
              className="text-indigo-700"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">
            Employee Management
          </h1>

          <p className="mt-2 text-white/80">
            Welcome back! Please login to continue.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div className="relative">

            <Mail
              size={20}
              className="absolute left-4 top-4 text-white/70"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/30 bg-white/20 py-3 pl-12 pr-4 text-white placeholder-white/60 outline-none transition focus:border-white focus:ring-2 focus:ring-white/40"
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-4 text-white/70"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/30 bg-white/20 py-3 pl-12 pr-12 text-white placeholder-white/60 outline-none transition focus:border-white focus:ring-2 focus:ring-white/40"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-3.5 text-white/70 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-indigo-700 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogIn size={20} />

            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="mt-8 border-t border-white/20 pt-5 text-center">

          <p className="text-sm text-white/70">
            Secure Employee Portal
          </p>

        </div>

      </div>

    </main>
  );
}