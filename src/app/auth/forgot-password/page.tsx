"use client";

import { createClient } from "@/lib/client";
import { ArrowRight, CheckCircle2, LineChart, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
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
            Secure account recovery keeps your operations moving without delay.
          </p>
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-10 xl:p-14">
        <div className="absolute right-6 top-6 hidden text-sm font-medium text-[#596072] sm:block lg:right-10 lg:top-8">
          Remember your password?
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
              Reset your password
            </h2>
            <p className="mt-1 text-base font-medium text-[#6a7182]">
              Enter your email and we will send a reset link.
            </p>
          </header>

          {success ? (
            <div className="space-y-5 rounded-lg border border-[#d7e4ff] bg-[#f4f8ff] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#0c49a6]" />
                <p className="text-sm font-medium text-[#243249]">
                  Reset email sent. Please check your inbox and spam folder.
                </p>
              </div>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0c49a6] hover:underline"
              >
                Back to login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <label className="block space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#596072]">
                  Email Address
                </span>
                <div className="group relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8691a5]" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Sending..." : "Send reset email"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-[#e6ebf5] pt-8 sm:hidden">
            <p className="text-center text-sm font-medium text-[#6a7182]">
              Remember your password?
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
