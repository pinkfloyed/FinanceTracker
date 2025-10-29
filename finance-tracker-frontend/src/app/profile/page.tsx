"use client";

import API from "@/lib/api";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/Auth/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-lg text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-lg text-red-500 text-center mt-10">Profile not found.</p>;

  const profileData = [
    { label: "ID", value: user.id, color: "bg-purple-100", textColor: "text-purple-800" },
    { label: "Display Name", value: user.displayName, color: "bg-blue-100", textColor: "text-blue-800" },
    { label: "Email", value: user.email, color: "bg-green-100", textColor: "text-green-800" },
    { label: "Gender", value: user.gender || "-", color: "bg-pink-100", textColor: "text-pink-800" },
    { label: "Preferred Currency", value: user.preferredCurrency || "BDT", color: "bg-yellow-100", textColor: "text-yellow-800" },
    { label: "Preferred Language", value: user.preferredLanguage || "English", color: "bg-indigo-100", textColor: "text-indigo-800" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-5xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileData.map((item, idx) => (
          <div
            key={idx}
            className={`${item.color} p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all`}
          >
            <p className={`text-lg font-semibold ${item.textColor}`}>{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
