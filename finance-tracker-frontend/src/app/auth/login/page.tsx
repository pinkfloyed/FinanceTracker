"use client";

import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/Auth/Login", { email, password });
      login(res.data.accessToken, res.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
          Login
        </button>
        <p className="mt-3 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span onClick={() => router.push("/auth/register")} className="text-blue-600 hover:underline cursor-pointer">
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
