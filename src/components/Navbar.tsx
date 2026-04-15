"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";

const navItems = [
  { name: "Live Map", href: "/" },
  { name: "Fleet Status", href: "/fleet" },
  { name: "Route Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="h-16 bg-indigo-50 flex items-center px-4">
      {/* LEFT SECTION  */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-6 ml-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium pb-1 transition-all whitespace-nowrap ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 px-4">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
          />
        </div>

        {/* ICONS & PROFILE */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-900 hover:text-blue-600">
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-900 hover:text-blue-600">
            <Settings className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
            <img src="/UserAvatar.svg" alt="user" />
          </div>
        </div>
      </div>
    </nav>
  );
}