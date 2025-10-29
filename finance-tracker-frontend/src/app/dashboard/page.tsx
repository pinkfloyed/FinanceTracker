"use client";
import API from "@/lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);

  const fetchSummary = async () => {
    const res = await API.get("/Dashboard/summary");
    setSummary(res.data);
  };

  useEffect(() => { fetchSummary(); }, []);

  if (!summary) return <p className="text-lg">Loading...</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-5xl font-extrabold">Dashboard</h1>
      <p className="text-xl text-gray-700 mb-6">
        Welcome to your finance dashboard. Manage your expenses, income, budgets, and goals efficiently!
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-green-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="font-bold text-3xl">💰 Total Income</h3>
          <p className="text-green-700 text-4xl font-extrabold">৳{summary.totalIncome}</p>
        </div>
        <div className="p-6 bg-red-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="font-bold text-3xl">🛒 Total Expenses</h3>
          <p className="text-red-700 text-4xl font-extrabold">৳{summary.totalExpenses}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="font-bold text-3xl">⚖️ Net Balance</h3>
          <p className={`text-4xl font-extrabold ${summary.netBalance >= 0 ? "text-green-700" : "text-red-700"}`}>
            ৳{summary.netBalance}
          </p>
        </div>
      </div>

      {/* Top Expenses */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="font-bold text-3xl mb-4">📊 Top 5 Expenses</h2>
        <table className="w-full border-collapse text-lg">
          <thead className="bg-gray-200 text-xl">
            <tr>
              <th className="p-4 border">Title</th>
              <th className="p-4 border">Category</th>
              <th className="p-4 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.top5Expenses.map((e: any, idx: number) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition text-lg">
                <td className="p-3 border">{e.description || "-"}</td>
                <td className="p-3 border">{e.category}</td>
                <td className="p-3 border">৳{e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budgets */}
      <div>
        <h2 className="font-bold text-3xl mb-4">🎯 Budgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summary.budgets.map((b: any, idx: number) => {
            const spent = summary.expensesByCategory.find((c: any) => c.Category === b.category)?.Amount || 0;
            const percent = Math.min((spent / b.limit) * 100, 100);
            return (
              <div key={idx} className="p-5 rounded-2xl shadow-lg bg-purple-50">
                <h3 className="font-bold text-2xl">{b.category}</h3>
                <p className="text-lg mb-2">৳{spent} / ৳{b.limit}</p>
                <div className="w-full bg-purple-200 h-4 rounded-full">
                  <div className="bg-purple-600 h-4 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goals */}
      <div>
        <h2 className="font-bold text-3xl mb-4">🏆 Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summary.goals.map((g: any, idx: number) => {
            const percent = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
            return (
              <div key={idx} className="p-5 rounded-2xl shadow-lg bg-yellow-50">
                <h3 className="font-bold text-2xl">{g.title}</h3>
                <p className="text-lg mb-2">৳{g.currentAmount} / ৳{g.targetAmount}</p>
                <div className="w-full bg-yellow-200 h-4 rounded-full">
                  <div className="bg-yellow-500 h-4 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-gray-600 text-base mt-2">Target Date: {new Date(g.targetDate).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
