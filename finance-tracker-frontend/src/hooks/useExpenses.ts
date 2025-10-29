"use client";
import API from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";

export function useExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const res = await API.get("/Expense", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, fetchExpenses, loading, error };
}
