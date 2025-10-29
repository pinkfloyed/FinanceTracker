"use client";

import Link from "next/link";
import { FaBullseye, FaChartPie, FaFileInvoiceDollar, FaMoneyBillWave, FaWallet } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-700 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to FinanceTracker 💰</h1>
          <p className="text-xl mb-6">
            Manage your expenses, income, budgets, and goals in one place.
          </p>
          <Link
            href="/dashboard"
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What You Can Do</h2>
          <div className="grid gap-8 md:grid-cols-3">

            <Link href="/dashboard/expenses" className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition block">
              <FaWallet className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
              <p className="text-gray-600">Log your spending and see where your money goes.</p>
            </Link>

            <Link href="/dashboard/income" className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition block">
              <FaMoneyBillWave className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manage Income</h3>
              <p className="text-gray-600">Record income sources and stay on top of your finances.</p>
            </Link>

            <Link href="/dashboard/budgets" className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition block">
              <FaChartPie className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Set Budgets</h3>
              <p className="text-gray-600">Create budgets to control your expenses effectively.</p>
            </Link>

            <Link href="/dashboard/goals" className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition block">
              <FaBullseye className="text-5xl text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achieve Goals</h3>
              <p className="text-gray-600">Define savings goals and track your progress easily.</p>
            </Link>

            <Link href="/dashboard/reports" className="bg-gray-100 p-8 rounded-xl shadow hover:shadow-lg transition block">
              <FaFileInvoiceDollar className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generate Reports</h3>
              <p className="text-gray-600">Get detailed insights with charts and reports.</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-auto">
        &copy; {new Date().getFullYear()} Pinki Akter. All rights reserved.
      </footer>
    </div>
  );
}
