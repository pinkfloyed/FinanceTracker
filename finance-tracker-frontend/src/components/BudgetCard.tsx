"use client";
import API from "@/lib/api";
import { useEffect, useState } from "react";

export default function BudgetCard() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState("Monthly");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchBudgets = async () => {
    const res = await API.get("/Budget");
    setBudgets(res.data);
  };

  useEffect(() => { fetchBudgets(); }, []);

  const submit = async () => {
    const data = {
      category,
      limit: parseFloat(limit),
      period,
      startDate: new Date().toISOString()
    };

    if (editId !== null) {
      await API.put(`/Budget/${editId}`, data);
      setEditId(null);
    } else {
      await API.post("/Budget", data);
    }

    setCategory("");
    setLimit("");
    setPeriod("Monthly");
    fetchBudgets();
  };

  const editBudget = (b: any) => {
    setEditId(b.id);
    setCategory(b.category);
    setLimit(b.limit);
    setPeriod(b.period);
  };

  const deleteBudget = async (id: number) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      await API.delete(`/Budget/${id}`);
      fetchBudgets();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>

      {/* Budget Form */}
      <div className="flex flex-col gap-2 border p-4 rounded mb-6">
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Limit"
          value={limit}
          onChange={e => setLimit(e.target.value)}
          type="number"
          className="border p-2"
        />
        <select value={period} onChange={e => setPeriod(e.target.value)} className="border p-2">
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
        <button
          onClick={submit}
          className="bg-green-600 text-white p-2 rounded"
        >
          {editId !== null ? "Update Budget" : "Add Budget"}
        </button>
      </div>

      {/* Budget Table */}
      <table className="w-full mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Limit</th>
            <th className="p-2 border">Period</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{b.category}</td>
              <td className="p-2 border">{b.limit}</td>
              <td className="p-2 border">{b.period}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => editBudget(b)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBudget(b.id)}
                  className="bg-red-600 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
