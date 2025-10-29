"use client";
import { useState, useEffect } from "react";
import API from "@/lib/api";

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().slice(0, 10));
  const [editId, setEditId] = useState<number | null>(null);

  const fetchGoals = async () => {
    const res = await API.get("/Goal");
    setGoals(res.data);
  };

  useEffect(() => { fetchGoals(); }, []);

  const submit = async () => {
    const data = {
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      targetDate
    };

    if (editId !== null) {
      await API.put(`/Goal/${editId}`, data);
      setEditId(null);
    } else {
      await API.post("/Goal", data);
    }

    setTitle("");
    setTargetAmount("");
    setCurrentAmount("");
    setTargetDate(new Date().toISOString().slice(0, 10));
    fetchGoals();
  };

  const editGoal = (g: any) => {
    setEditId(g.id);
    setTitle(g.title);
    setTargetAmount(g.targetAmount);
    setCurrentAmount(g.currentAmount);
    setTargetDate(g.targetDate?.slice(0, 10) || new Date().toISOString().slice(0, 10));
  };

  const deleteGoal = async (id: number) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      await API.delete(`/Goal/${id}`);
      fetchGoals();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Goals</h1>

      {/* Goal Form */}
      <div className="flex flex-col gap-2 border p-4 rounded mb-6">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Target Amount"
          value={targetAmount}
          onChange={e => setTargetAmount(e.target.value)}
          type="number"
          className="border p-2"
        />
        <input
          placeholder="Current Amount"
          value={currentAmount}
          onChange={e => setCurrentAmount(e.target.value)}
          type="number"
          className="border p-2"
        />
        <input
          type="date"
          value={targetDate}
          onChange={e => setTargetDate(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={submit}
          className="bg-green-600 text-white p-2 rounded"
        >
          {editId !== null ? "Update Goal" : "Add Goal"}
        </button>
      </div>

      {/* Goals Table */}
      <table className="w-full mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Target</th>
            <th className="p-2 border">Current</th>
            <th className="p-2 border">Target Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((g, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{g.title}</td>
              <td className="p-2 border">{g.targetAmount}</td>
              <td className="p-2 border">{g.currentAmount}</td>
              <td className="p-2 border">{new Date(g.targetDate).toLocaleDateString()}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => editGoal(g)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGoal(g.id)}
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
