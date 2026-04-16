import Link from "next/link";
import { ArrowRight, LineChart, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full overflow-hidden bg-[#e8ebf6] text-[#141b2c]">
      <section className="relative hidden w-1/2 overflow-hidden bg-[#0c49a6] p-10 text-white lg:flex lg:flex-col lg:justify-center xl:p-14">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-[2rem] border-[44px] border-[#2e63b6] opacity-80" />
        <div className="absolute -left-24 bottom-[20%] h-64 w-64 rotate-45 border border-[#5f8ada] opacity-40" />

        <div className="relative max-w-xl">
          {/* <div className="mb-12 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#0c49a6]">
              <LineChart className="h-5 w-5" />
            </span>
          </div> */}

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">
            Precision Fleet
            <br />
            Management.
          </h1>
          <p className="max-w-xl text-lg font-medium text-[#c7d7ff] xl:text-2xl">
            Join the global network of logistics architects. Every mile
            measured, every second optimized.
          </p>
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-10 xl:p-14">
        <div className="absolute right-6 top-6 hidden text-sm font-medium text-[#596072] sm:block lg:right-10 lg:top-8">
          Need system access?
          <Link
            href="/register"
            className="ml-1 font-bold text-[#0c49a6] hover:underline"
          >
            Register
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
              Access Portal
            </h2>
            <p className="mt-1 text-base font-medium text-[#6a7182]">
              Enter your credentials to manage the fleet.
            </p>
          </header>

          <form className="space-y-4">
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
                  className="w-full rounded-lg bg-[#e4eafc] py-3 pl-10 pr-4 text-base text-[#1f2637] placeholder:text-[#97a2b8] outline-none ring-[#0c49a6] transition focus:ring-2"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0c49a6] transition-all duration-300 group-focus-within:w-full" />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#596072]">
                  Security Key
                </span>
                <Link
                  href="#"
                  className="text-xs font-bold text-[#0c49a6] transition-opacity hover:opacity-80"
                >
                  Forgot Password?
                </Link>
              </span>

              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8691a5]" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-[#e4eafc] py-3 pl-10 pr-4 text-base text-[#1f2637] placeholder:text-[#97a2b8] outline-none ring-[#0c49a6] transition focus:ring-2"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0c49a6] transition-all duration-300 group-focus-within:w-full" />
              </div>
            </label>

            <label className="flex items-center gap-3 pt-1 text-sm font-medium text-[#596072]">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[#b2bbce] text-[#0c49a6] accent-[#0c49a6]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0c49a6] px-5 py-3 text-lg font-bold text-white shadow-lg shadow-[#1a4ea8]/20 transition hover:bg-[#0f56be] active:scale-[0.99]"
            >
              Log In <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 border-t border-[#e6ebf5] pt-8 sm:hidden">
            <p className="text-center text-sm font-medium text-[#6a7182]">
              Need system access?
              <Link
                href="/register"
                className="ml-1 font-bold text-[#0c49a6] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
