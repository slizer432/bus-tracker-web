import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  MoreVertical,
  Plus,
} from "lucide-react";

type RouteStatus = "on-schedule" | "minor-delays" | "delayed";

type RouteItem = {
  id: string;
  name: string;
  direction: string;
  status: RouteStatus;
  activeBuses: number;
};

const routes: RouteItem[] = [
  {
    id: "101",
    name: "Alun-Alun",
    direction: "Northbound / Southbound",
    status: "on-schedule",
    activeBuses: 12,
  },
  {
    id: "402",
    name: "Blimbing",
    direction: "Eastbound / Westbound",
    status: "minor-delays",
    activeBuses: 8,
  },
  {
    id: "205",
    name: "Soehat",
    direction: "Circular Route",
    status: "on-schedule",
    activeBuses: 6,
  },
  {
    id: "99X",
    name: "Sukun",
    direction: "Peak Service",
    status: "delayed",
    activeBuses: 4,
  },
  {
    id: "311",
    name: "Singosari",
    direction: "Westbound / Eastbound",
    status: "on-schedule",
    activeBuses: 5,
  },
];

const statusStyles: Record<RouteStatus, string> = {
  "on-schedule": "bg-emerald-100 text-emerald-800",
  "minor-delays": "bg-amber-100 text-amber-800",
  delayed: "bg-red-100 text-red-700",
};

const statusDotStyles: Record<RouteStatus, string> = {
  "on-schedule": "bg-emerald-500",
  "minor-delays": "bg-amber-500",
  delayed: "bg-red-600",
};

const statusLabels: Record<RouteStatus, string> = {
  "on-schedule": "On Schedule",
  "minor-delays": "Minor Delays",
  delayed: "Delayed",
};

function RouteStatusBadge({ status }: { status: RouteStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-tight ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]} ${status === "on-schedule" ? "animate-pulse" : ""}`}
      />
      {statusLabels[status]}
    </span>
  );
}

export default function RoutesPage() {
  return (
    <section className="space-y-6 md:space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#586579]">
            Network Management
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#141b2c]">
            Active Route Oversight
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#c3c6d6]/70 bg-white px-4 py-2 text-sm font-semibold text-[#424654] shadow-sm transition-colors hover:bg-[#f1f3ff]">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-[#c3c6d6]/40 bg-white shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#c3c6d6]/35 bg-[#f5f7ff]">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
                  <span className="inline-flex items-center gap-1">
                    Route ID <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
                  <span className="inline-flex items-center gap-1">
                    Live Status <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
                  <span className="inline-flex items-center gap-1">
                    Active Buses <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
                  Quick Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#c3c6d6]/30">
              {routes.map((route) => {
                const routePillClass =
                  route.status === "delayed"
                    ? "bg-[#ffdad6] text-[#ba1a1a]"
                    : route.status === "minor-delays"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-[#dae2ff] text-[#0040a1]";

                return (
                  <tr
                    key={route.id}
                    className="transition-colors hover:bg-[#f6f8ff]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold ${routePillClass}`}
                        >
                          {route.id}
                        </div>
                        <div>
                          <p className="font-bold text-[#1f2633]">
                            {route.name}
                          </p>
                          <p className="text-xs text-[#737785]">
                            {route.direction}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <RouteStatusBadge status={route.status} />
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className="text-2xl font-bold leading-none text-[#1f2633] max-lg:text-2xl">
                        {route.activeBuses}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          aria-label={`View route ${route.id}`}
                          className="rounded-lg p-2 text-[#0040a1] transition-colors hover:bg-[#eaf0ff]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          aria-label={`More actions for route ${route.id}`}
                          className="rounded-lg p-2 text-[#586579] transition-colors hover:bg-[#eef2ff]"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {routes.map((route) => (
            <article
              key={route.id}
              className="rounded-xl border border-[#dbe2f9] bg-[#f9faff] p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#586579]">
                    Route {route.id}
                  </p>
                  <h2 className="text-lg font-extrabold text-[#1f2633]">
                    {route.name}
                  </h2>
                  <p className="text-xs text-[#737785]">{route.direction}</p>
                </div>
                <RouteStatusBadge status={route.status} />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#586579]">
                  Active Buses
                </p>
                <p className="text-2xl font-extrabold text-[#1f2633]">
                  {route.activeBuses}
                </p>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  aria-label={`View route ${route.id}`}
                  className="rounded-lg bg-white p-2 text-[#0040a1] ring-1 ring-[#dbe2f9]"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  aria-label={`More actions for route ${route.id}`}
                  className="rounded-lg bg-white p-2 text-[#586579] ring-1 ring-[#dbe2f9]"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#c3c6d6]/35 bg-[#f8f9ff] px-5 py-4 text-sm text-[#586579] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-bold text-[#141b2c]">5</span> of{" "}
            <span className="font-bold text-[#141b2c]">32</span> active routes
          </p>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              disabled
              aria-label="Previous page"
              className="rounded-md border border-[#c3c6d6]/60 p-1.5 text-[#9da3b0] disabled:opacity-70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next page"
              className="rounded-md border border-[#c3c6d6]/60 p-1.5 text-[#586579] transition-colors hover:bg-[#eef2ff]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
