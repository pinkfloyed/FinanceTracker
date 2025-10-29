"use client";
import ExpenseForm from "@/components/ExpensesPage";

export default function ExpensesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <ExpenseForm />
    </div>
  );
}
