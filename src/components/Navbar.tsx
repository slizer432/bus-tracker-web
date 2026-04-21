"use client";

import { normalizeAppRole, type AppRole } from "@/lib/auth-role";
import { createClient } from "@/lib/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";

const navItems = [{ name: "Fleet Status", href: "/fleet" }];

function getDisplayName(user: User | null): string {
  const fullName = user?.user_metadata?.full_name;

  if (typeof fullName === "string" && fullName.trim() !== "") {
    return fullName;
  }

  const emailName = user?.email?.split("@")[0];

  if (emailName && emailName.trim() !== "") {
    return emailName;
  }

  return "User";
}

function getUserRole(user: User | null): AppRole {
  return normalizeAppRole(user?.user_metadata?.role);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState<AppRole>("user");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setUserName(getDisplayName(user));
      setUserRole(getUserRole(user));
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserName(getDisplayName(session?.user ?? null));
      setUserRole(getUserRole(session?.user ?? null));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("isLoggedIn");
    setIsMenuOpen(false);
    router.push("/auth/login");
  };

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
                className={`text-sm font-medium pb-1 transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-500 border-transparent hover:text-blue-600"
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
        {/* ICONS & PROFILE */}
        <div className="flex items-center gap-4">
          <p className="hidden text-sm font-semibold text-slate-700 sm:block">
            Hello, {userName}
          </p>

          <span className="hidden rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 sm:inline-flex">
            {userRole}
          </span>

          <button className="cursor-pointer p-2 text-gray-900 hover:text-blue-600">
            <Bell className="w-5 h-5" />
          </button>

          <button className="cursor-pointer p-2 text-gray-900 hover:text-blue-600">
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="cursor-pointer inline-flex items-center gap-1 rounded-full border border-transparent p-0.5 transition hover:border-blue-200"
            >
              <span className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src="/circle-user.svg"
                  alt="user"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
