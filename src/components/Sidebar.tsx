"use client";

import Link from "next/link";
import { BusFront, LayoutDashboard, Route, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

type SidebarRole = "admin" | "user";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Active Routes",
    href: "/routes",
    icon: Route,
  },
  // {
  //   name: "Terminal Hub",
  //   href: "/terminal",
  //   icon: Building2,
  // },
  {
    name: "Admin",
    href: "/admin",
    icon: Wrench,
    requiresAdmin: true,
  },
];

export default function Sidebar({ role }: { role: SidebarRole }) {
  const pathname = usePathname();
  const visibleItems = navItems.filter(
    (item) => !item.requiresAdmin || role === "admin",
  );

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col bg-[#f1f3ff] py-8 px-4 transition-all duration-300 ease-in-out border-r border-[#dbe2f9]">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0040a1] shadow-lg">
          <BusFront className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold leading-none text-[#0040a1]">
            Bus Tracker
          </h1>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-[#586579]">
            Bus Fleet Management
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
                isActive
                  ? "bg-white text-[#0040a1] font-bold shadow-sm"
                  : "text-[#424654] hover:bg-white/90"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* <div className="mt-auto">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0040a1] px-4 py-4 font-bold text-white transition-opacity hover:opacity-90">
          <Share2 className="h-4 w-4" />
          <span>Export Fleet Data</span>
        </button>
      </div> */}
    </aside>
  );
}
