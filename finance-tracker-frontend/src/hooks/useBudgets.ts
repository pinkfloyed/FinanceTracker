"use client";

import API from "@/lib/api";
import { useEffect, useState } from "react";

export function useBudgets() {
  const [budgets, setBudgets] = useState<any[]>([]);

  const fetchBudgets = async () => {
    try {
      const res = await API.get("/Budget");
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { budgets, fetchBudgets };
}
