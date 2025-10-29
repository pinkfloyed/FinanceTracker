"use client";

import API from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptUrl?: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [receipt, setReceipt] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await API.get("/Expense", { headers: { Authorization: `Bearer ${token}` } });
      setExpenses(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 16));
    setReceipt(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("Amount", amount.toString());
      formData.append("Category", category);
      formData.append("Description", description);
      formData.append("Date", new Date(date).toISOString());
      if (receipt) formData.append("ReceiptUrl", receipt);

      if (editingId) {
        await API.put(`/Expense/${editingId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await API.post("/Expense", formData, { headers: { Authorization: `Bearer ${token}` } });
      }

      fetchExpenses();
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save expense");
    }
  };

  const handleEdit = (exp: Expense) => {
    setEditingId(exp.id);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDescription(exp.description);
    setDate(new Date(exp.date).toISOString().slice(0, 16));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      const token = getToken();
      await API.delete(`/Expense/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchExpenses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Expense" : "Add Expense"}</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} placeholder="Amount *" className="border p-2 w-full mb-3 rounded" required />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category *" className="border p-2 w-full mb-3 rounded" required />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full mb-3 rounded" />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="border p-2 w-full mb-3 rounded" />
        <input type="file" onChange={e => setReceipt(e.target.files?.[0] || null)} className="border p-2 w-full mb-4 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{editingId ? "Update Expense" : "Add Expense"}</button>
        {editingId && <button type="button" onClick={resetForm} className="w-full mt-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition">Cancel</button>}
      </form>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Expenses</h2>
        {loading ? <p>Loading...</p> : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Receipt</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td className="border p-2">{exp.amount}</td>
                  <td className="border p-2">{exp.category}</td>
                  <td className="border p-2">{exp.description}</td>
                  <td className="border p-2">{new Date(exp.date).toLocaleString()}</td>
                  <td className="border p-2">
                    {exp.receiptUrl ? (
                      <a href={exp.receiptUrl} target="_blank">
                        <img src={`http://localhost:5056/${exp.receiptUrl}`} alt="Receipt"

                          className="w-16 h-16 object-cover rounded border"
                        />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border p-2 flex gap-2">
                    <button onClick={() => handleEdit(exp)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(exp.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

  );
}
