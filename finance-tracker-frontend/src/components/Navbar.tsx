"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <Link href="/home" className="font-bold text-lg">
        FinanceTracker
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-4">
        <Link href="/home" className="px-3 py-1 rounded hover:bg-blue-700 transition">
          Home
        </Link>
        <Link href="/about" className="px-3 py-1 rounded hover:bg-blue-700 transition">
          About
        </Link>
        <Link href="/dashboard" className="px-3 py-1 rounded hover:bg-blue-700 transition">
          Dashboard
        </Link>

        {/* Auth Section */}
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-3 py-1 rounded hover:bg-blue-700 transition font-semibold"
            >
              {user.displayName || user.userName}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login" className="px-3 py-1 rounded hover:bg-blue-700 transition">
              Login
            </Link>
            <Link href="/auth/register" className="px-3 py-1 rounded hover:bg-blue-700 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

