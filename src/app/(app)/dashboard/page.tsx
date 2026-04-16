import BusCard from "@/components/BusCard";

const fleetCards = [
  {
    route: "Route 101",
    eta: "5 mins",
    lastStop: "Oak Street Station",
    passengers: 24,
    capacity: 40,
    heading: "Northbound",
    status: "normal" as const,
  },
  {
    route: "Route 402",
    eta: "12 mins",
    lastStop: "Market Terminal",
    passengers: 38,
    capacity: 40,
    heading: "Westbound",
    status: "delayed" as const,
  },
  {
    route: "Route 205",
    eta: "2 mins",
    lastStop: "Central Plaza",
    passengers: 12,
    capacity: 40,
    heading: "Southbound",
    status: "warning" as const,
  },
  {
    route: "Route 108",
    eta: "8 mins",
    lastStop: "Heritage Park",
    passengers: 22,
    capacity: 40,
    heading: "Northbound",
    status: "normal" as const,
  },
  {
    route: "Route 311",
    eta: "4 mins",
    lastStop: "River Heights",
    passengers: 15,
    capacity: 40,
    heading: "Eastbound",
    status: "normal" as const,
  },
  {
    route: "Route 99x",
    eta: "Delayed",
    lastStop: "Bayview Harbor",
    passengers: 32,
    capacity: 40,
    heading: "Express North",
    status: "delayed" as const,
  },
  {
    route: "Route 212",
    eta: "7 mins",
    lastStop: "Science District",
    passengers: 19,
    capacity: 40,
    heading: "Southbound",
    status: "normal" as const,
  },
  {
    route: "Route 005",
    eta: "1 min",
    lastStop: "Union Square",
    passengers: 36,
    capacity: 40,
    heading: "Crosstown",
    status: "warning" as const,
  },
];

export default function DashboardPage() {
  const delayedCount = fleetCards.filter(
    (bus) => bus.status === "delayed",
  ).length;
  const activeCount = fleetCards.length - delayedCount;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl bg-linear-to-r from-[#f9f9ff] to-[#eef3ff] p-5 ring-1 ring-[#dbe2f9] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#586579]">
            System Overview
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2c] sm:text-3xl">
            Active Fleet Control
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-[#dbe2f9]">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-[#141b2c]">
              {activeCount} Active
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-[#dbe2f9]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#bc140d]" />
            <span className="text-sm font-semibold text-[#141b2c]">
              {delayedCount} Delayed
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fleetCards.map((bus) => (
          <BusCard
            key={bus.route}
            route={bus.route}
            eta={bus.eta}
            lastStop={bus.lastStop}
            passengers={bus.passengers}
            capacity={bus.capacity}
            heading={bus.heading}
            status={bus.status}
          />
        ))}
      </div>
    </section>
  );
}
