"use client";

import { FaBullseye, FaChartPie, FaFileInvoiceDollar, FaMoneyBillWave, FaWallet } from "react-icons/fa";

export default function AboutPage() {
  const features = [
    { icon: <FaWallet className="text-white w-6 h-6" />, title: "Track Expenses", color: "bg-blue-500" },
    { icon: <FaMoneyBillWave className="text-white w-6 h-6" />, title: "Track Income", color: "bg-green-500" },
    { icon: <FaChartPie className="text-white w-6 h-6" />, title: "Manage Budgets", color: "bg-purple-500" },
    { icon: <FaBullseye className="text-white w-6 h-6" />, title: "Set Goals", color: "bg-yellow-500" },
    { icon: <FaFileInvoiceDollar className="text-white w-6 h-6" />, title: "Generate Reports", color: "bg-red-500" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        About FinanceTracker
      </h1>

      <p className="text-lg text-gray-700 text-center mb-10">
        FinanceTracker is a modern web application designed to help you manage your personal finances easily.
        Track your expenses, income, budgets, and goals with an intuitive dashboard and detailed reports.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:scale-105 transition-transform bg-white">
            <div className={`p-4 rounded-full ${f.color} mb-4`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-500 text-center">
              Easily manage your {f.title.toLowerCase()} and gain insights to improve your financial habits.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Built With Modern Stack</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">

          <span className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:scale-105 transition">
            Backend: .NET Core + MySQL + Swagger
          </span>

          <span className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:scale-105 transition">
            Frontend: Next.js + Tailwind CSS + React
          </span>

          <span className="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold shadow hover:scale-105 transition">
            Features: JWT Auth, CRUD, Responsive UI, File Uploads
          </span>

        </div>
      </div>

    </div>
  );
}
