"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBullseye, FaChartPie, FaCog, FaFileInvoiceDollar, FaHome, FaMoneyBillWave, FaWallet } from "react-icons/fa";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <FaHome /> },
    { label: "Expenses", href: "/dashboard/expenses", icon: <FaWallet /> },
    { label: "Income", href: "/dashboard/income", icon: <FaMoneyBillWave /> },
    { label: "Budgets", href: "/dashboard/budgets", icon: <FaChartPie /> },
    { label: "Goals", href: "/dashboard/goals", icon: <FaBullseye /> },
    { label: "Reports", href: "/dashboard/reports", icon: <FaFileInvoiceDollar /> },
    { label: "Settings", href: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-8">FinanceTracker</h2>
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors 
                ${isActive ? "bg-blue-600 font-semibold" : "hover:bg-gray-700"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-300">Logged in as:</p>
        <p className="font-semibold">{user.displayName || user.userName}</p>
      </div>
    </aside>
  );
}
