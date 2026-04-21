import { AlertTriangle, ArrowRight, LineChart } from "lucide-react";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

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
            We hit an authentication issue, but you can safely try again.
          </p>
        </div>
      </section>

      <section className="relative flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-10 xl:p-14">
        <div className="absolute right-6 top-6 hidden text-sm font-medium text-[#596072] sm:block lg:right-10 lg:top-8">
          Back to access?
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

          <div className="space-y-4 rounded-lg border border-[#ffd8d4] bg-[#fff6f5] p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-[#b3261e]" />
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1f2637]">
                  Authentication error
                </h2>
                <p className="mt-2 text-sm font-medium text-[#5a3640]">
                  {params?.error
                    ? `Code error: ${params.error}`
                    : "An unspecified error occurred."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0c49a6] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0f56be]"
            >
              Back to login
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-lg border border-[#b9c8ea] px-4 py-2 text-sm font-bold text-[#0c49a6] transition hover:bg-[#eef3ff]"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
