"use client";

import API from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {

      const payload = {
        UserName: userName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        Gender: gender,
        PreferredCurrency: currency,
        PreferredLanguage: language,
      };


      const res = await API.post("/Auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });


      setToken(res.data.accessToken);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Display Name"
          className="border p-2 w-full mb-3 rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full mb-3 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="border p-2 w-full mb-3 rounded"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="BDT">BDT</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>

        <select
          className="border p-2 w-full mb-4 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        >
          <option value="en">English</option>
          <option value="ban">Bangla</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>


        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>


      </form>
    </div>
  );
}