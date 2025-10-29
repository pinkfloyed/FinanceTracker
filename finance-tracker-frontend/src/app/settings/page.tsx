"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    try {
      await API.put("/Auth/profile", { displayName, email });
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    setLoading(true);
    try {
      await API.put("/Auth/change-password", { currentPassword, newPassword });
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Settings</h1>

      {/* Profile Update */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-blue-700">Update Profile</h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Display Name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={updateProfile}
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition mt-2"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>

      {/* Password Update */}
      <div className="bg-green-50 p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-green-700">Change Password</h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="font-semibold">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <label className="font-semibold">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={updatePassword}
            disabled={loading}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition mt-2"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="text-center">
        <button
          onClick={logout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
