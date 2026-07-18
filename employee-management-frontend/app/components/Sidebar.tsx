"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Menu based on user role
  const menu =
    role === "SUPER_ADMIN"
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Employees",
            href: "/employees",
            icon: Users,
          },
          {
            name: "Departments",
            href: "/departments",
            icon: Building2,
          },
        ]
      : role === "HR_MANAGER"
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Employees",
            href: "/employees",
            icon: Users,
          },
          {
            name: "Departments",
            href: "/departments",
            icon: Building2,
          },
        ]
      : [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
        ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col bg-gradient-to-b from-pink-600 via-fuchsia-600 to-purple-700 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-white/20 p-8">

        <h1 className="text-3xl font-extrabold tracking-wide">
          EMS
        </h1>

        <p className="mt-2 text-sm text-pink-100">
          Employee Management System
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <div className="space-y-3">

          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-300 ${
                  active
                    ? "bg-white text-pink-600 shadow-xl"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Icon size={24} />
                {item.name}
              </Link>
            );
          })}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-white/20 p-6">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-bold text-pink-600 transition hover:bg-pink-100"
        >
          <LogOut size={20} />
          Logout
        </button>

        <div className="mt-6 rounded-xl bg-white/10 p-4">

          <p className="text-sm font-semibold">
            Logged in as
          </p>

          <p className="mt-1 rounded-lg bg-white/20 px-3 py-2 text-center font-bold uppercase">
            {role.replace("_", " ")}
          </p>

        </div>

        <p className="mt-6 text-center text-xs text-pink-100">
          Employee Management System
        </p>

        <p className="mt-1 text-center text-xs text-pink-200">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}