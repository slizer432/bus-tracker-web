"use client";

import { createClient } from "@/lib/client";
import { ArrowRight, LineChart, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/protected");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full overflow-hidden bg-[#e8ebf6] text-[#141b2c]">
      <section className="relative hidden w-1/2 overflow-hidden bg-[#0c49a6] p-10 text-white lg:flex lg:flex-col lg:justify-center xl:p-14">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-[2rem] border-[44px] border-[#2e63b6] opacity-80" />
        <div className="absolute -left-24 bottom-[20%] h-64 w-64 rotate-45 border border-[#5f8ada] opacity-40" />

        <div className="relative max-w-xl">
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">
            Precision Fleet
            <br />
            Management.
          </h1>
          <p className="max-w-xl text-lg font-medium text-[#c7d7ff] xl:text-2xl">
            Set a new secure password and return to your control center.
          </p>
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-10 xl:p-14">
        <div className="absolute right-6 top-6 hidden text-sm font-medium text-[#596072] sm:block lg:right-10 lg:top-8">
          Need to sign in?
          <Link
            href="/auth/login"
            className="ml-1 font-bold text-[#0c49a6] hover:underline"
          >
            Login
          </Link>
        </div>

        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl shadow-[#0f2c66]/10 sm:p-10">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#e3ebff] text-[#0c49a6]">
              <LineChart className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-[#0c49a6]">
              Kinetic Precision
            </span>
          </div>

          <header className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1f2637]">
              Set new password
            </h2>
            <p className="mt-1 text-base font-medium text-[#6a7182]">
              Use a strong password you have not used before.
            </p>
          </header>

          <form className="space-y-4" onSubmit={handleUpdatePassword}>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#596072]">
                New Password
              </span>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8691a5]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-[#e4eafc] py-3 pl-10 pr-4 text-base text-[#1f2637] placeholder:text-[#97a2b8] outline-none ring-[#0c49a6] transition focus:ring-2"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0c49a6] transition-all duration-300 group-focus-within:w-full" />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#596072]">
                Confirm Password
              </span>
              <div className="group relative">
                <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8691a5]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg bg-[#e4eafc] py-3 pl-10 pr-4 text-base text-[#1f2637] placeholder:text-[#97a2b8] outline-none ring-[#0c49a6] transition focus:ring-2"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0c49a6] transition-all duration-300 group-focus-within:w-full" />
              </div>
            </label>

            {error ? (
              <p className="text-sm font-medium text-[#ba1a1a]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0c49a6] px-5 py-3 text-lg font-bold text-white shadow-lg shadow-[#1a4ea8]/20 transition hover:bg-[#0f56be] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Saving..." : "Save new password"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 border-t border-[#e6ebf5] pt-8 sm:hidden">
            <p className="text-center text-sm font-medium text-[#6a7182]">
              Need to sign in?
              <Link
                href="/auth/login"
                className="ml-1 font-bold text-[#0c49a6] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
