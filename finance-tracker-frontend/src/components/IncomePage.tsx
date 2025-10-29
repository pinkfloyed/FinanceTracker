"use client";
import { useState, useEffect } from "react";
import API from "@/lib/api";

export default function IncomePage() {
  const [income, setIncome] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState("");

  const fetchIncome = async () => {
    const res = await API.get("/Income");
    setIncome(res.data);
  };

  useEffect(() => { fetchIncome(); }, []);

  const submit = async () => {
    const payload = {
      amount: parseFloat(amount),
      source,
      description,
      isRecurring,
      recurrenceRule: isRecurring ? recurrenceRule : null,
      date: new Date().toISOString()
    };

    if (editing) {
      await API.put(`/Income/${editing.id}`, payload);
      setEditing(null);
    } else {
      await API.post("/Income", payload);
    }

    setAmount("");
    setSource("");
    setDescription("");
    setIsRecurring(false);
    setRecurrenceRule("");
    fetchIncome();
  };

  const editIncome = (i: any) => {
    setEditing(i);
    setAmount(i.amount);
    setSource(i.source);
    setDescription(i.description || "");
    setIsRecurring(i.isRecurring);
    setRecurrenceRule(i.recurrenceRule || "");
  };

  const cancelEdit = () => {
    setEditing(null);
    setAmount("");
    setSource("");
    setDescription("");
    setIsRecurring(false);
    setRecurrenceRule("");
  };

  const deleteIncome = async (id: number) => {
    if (!confirm("Are you sure you want to delete this income?")) return;
    await API.delete(`/Income/${id}`);
    fetchIncome();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Income</h1>

      {/* Add/Edit Form */}
      <div className="flex flex-col gap-2 border p-4 rounded mb-4">
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Source"
          value={source}
          onChange={e => setSource(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={e => setIsRecurring(e.target.checked)}
          />
          <label>Recurring Income</label>
        </div>
        {isRecurring && (
          <input
            placeholder="Recurrence Rule (e.g., weekly)"
            value={recurrenceRule}
            onChange={e => setRecurrenceRule(e.target.value)}
            className="border p-2"
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-green-600 text-white p-2 rounded"
          >
            {editing ? "Update Income" : "Add Income"}
          </button>
          {editing && (
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Income Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Source</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Recurring</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((i, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{i.amount}</td>
              <td className="p-2 border">{i.source}</td>
              <td className="p-2 border">{i.description || "-"}</td>
              <td className="p-2 border">
                {new Date(i.date).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                {i.isRecurring ? i.recurrenceRule || "Yes" : "No"}
              </td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => editIncome(i)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteIncome(i.id)}
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
