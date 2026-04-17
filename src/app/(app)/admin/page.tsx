"use client";

import {
  ArrowUpDown,
  Bus,
  Download,
  ListFilter,
  Map,
  Pencil,
  PlusCircle,
  Route,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

type AdminTab = "buses" | "routes";

type BusStatus = "ACTIVE" | "REPAIR" | "STANDBY";
type RouteStatus = "ACTIVE" | "DRAFT" | "INACTIVE";
type ScheduleType = "WEEKDAYS" | "DAILY" | "PEAK";
type SortDirection = "asc" | "desc";
type BusSortKey = "id" | "model" | "capacity" | "status";
type ConfiguredRouteSortKey = "route" | "coverage" | "type" | "status";

type BusItem = {
  id: string;
  model: string;
  capacity: number;
  status: BusStatus;
};

type ConfiguredRoute = {
  route: string;
  coverage: string;
  type: ScheduleType;
  status: RouteStatus;
};

const buses: BusItem[] = [
  { id: "VT-101", model: "Ecoliner Hybrid", capacity: 45, status: "ACTIVE" },
  { id: "VT-102", model: "Orion VII", capacity: 52, status: "REPAIR" },
  { id: "VT-103", model: "Ecoliner Hybrid", capacity: 45, status: "ACTIVE" },
  { id: "VT-104", model: "Nova Bus LFS", capacity: 40, status: "ACTIVE" },
  { id: "VT-105", model: "Van Hool A330", capacity: 48, status: "STANDBY" },
];

const configuredRoutes: ConfiguredRoute[] = [
  {
    route: "101 - Sukun",
    coverage: "Oak St -> Market",
    type: "WEEKDAYS",
    status: "ACTIVE",
  },
  {
    route: "402 - Soehat",
    coverage: "Bayview -> Plaza",
    type: "DAILY",
    status: "ACTIVE",
  },
  {
    route: "205 - Singosari",
    coverage: "Central -> Central",
    type: "DAILY",
    status: "DRAFT",
  },
  {
    route: "99X - Alun-Alun",
    coverage: "North -> South",
    type: "PEAK",
    status: "INACTIVE",
  },
];

const busStatusClass: Record<BusStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  REPAIR: "bg-amber-100 text-amber-700",
  STANDBY: "bg-slate-200 text-slate-600",
};

const routeStatusClass: Record<RouteStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  DRAFT: "bg-slate-200 text-slate-600",
  INACTIVE: "bg-rose-100 text-rose-700",
};

function BusesPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BusStatus | "ALL">("ALL");
  const [sortKey, setSortKey] = useState<BusSortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: BusSortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const displayedBuses = useMemo(() => {
    const filtered = buses.filter((bus) => {
      const bySearch =
        searchQuery.trim() === "" ||
        `${bus.id} ${bus.model}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const byStatus = statusFilter === "ALL" || bus.status === statusFilter;

      return bySearch && byStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortKey === "id") {
        comparison = a.id.localeCompare(b.id, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      } else if (sortKey === "model") {
        comparison = a.model.localeCompare(b.model);
      } else if (sortKey === "capacity") {
        comparison = a.capacity - b.capacity;
      } else {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [searchQuery, sortDirection, sortKey, statusFilter]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#cfd4e2] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-[#1f2633]">
          <PlusCircle className="h-5 w-5 text-[#0a4cad]" />
          <h2 className="text-3xl font-extrabold tracking-tight max-md:text-2xl">
            Register New Bus
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Bus ID
            </span>
            <input
              type="text"
              placeholder="e.g., VT-2024-001"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Capacity
            </span>
            <input
              type="number"
              placeholder="Max Passengers"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Status
            </span>
            <select className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2">
              <option>Active</option>
              <option>Repair</option>
              <option>Standby</option>
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Model
            </span>
            <input
              type="text"
              placeholder="e.g., Orion VII"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>
        </div>

        <button className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0a4cad] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          <Save className="h-4 w-4" />
          Save Bus Entry
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#cfd4e2] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#d8deeb] p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f2633]">
            Manage All Buses
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737b8c]" />
              <input
                type="text"
                placeholder="Search fleet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-[#d4daea] bg-[#eef2ff] py-2 pl-9 pr-3 text-sm outline-none ring-[#0a4cad] transition focus:ring-2"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as BusStatus | "ALL")
              }
              className="cursor-pointer rounded-md border border-[#d4daea] bg-[#eef2ff] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#485062] outline-none ring-[#0a4cad] focus:ring-2"
            >
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="REPAIR">Repair</option>
              <option value="STANDBY">Standby</option>
            </select>

            <button className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[#0a4cad] transition-opacity hover:opacity-80">
              <Download className="h-3.5 w-3.5" />
              Download CSV
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f1f4ff] text-[11px] font-bold uppercase tracking-[0.15em] text-[#586579]">
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("id")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "id"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Bus ID <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("model")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "model"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Model <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("capacity")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "capacity"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Capacity <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("status")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "status"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Status <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e5f1]">
              {displayedBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-[#f9fbff]">
                  <td className="px-4 py-4 font-bold text-[#1f2633]">
                    {bus.id}
                  </td>
                  <td className="px-4 py-4 text-[#5b6272]">{bus.model}</td>
                  <td className="px-4 py-4 font-semibold text-[#3e4658]">
                    {bus.capacity}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase ${busStatusClass[bus.status]}`}
                    >
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button className="cursor-pointer rounded-md p-2 text-[#586579] transition-colors hover:bg-[#eef2ff] hover:text-[#0a4cad]">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="cursor-pointer rounded-md p-2 text-[#586579] transition-colors hover:bg-[#fff1f1] hover:text-[#c33c45]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {displayedBuses.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-medium text-[#737b8c]"
                  >
                    No buses found for this search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {displayedBuses.map((bus) => (
            <article
              key={bus.id}
              className="rounded-xl border border-[#dbe2f0] bg-[#fbfcff] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-base font-bold text-[#1f2633]">{bus.id}</h4>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${busStatusClass[bus.status]}`}
                >
                  {bus.status}
                </span>
              </div>
              <p className="text-sm text-[#586579]">{bus.model}</p>
              <p className="mt-1 text-sm font-semibold text-[#3e4658]">
                Capacity: {bus.capacity}
              </p>
              <div className="mt-3 flex justify-end gap-2">
                <button className="cursor-pointer rounded-md bg-white p-2 text-[#586579] ring-1 ring-[#dbe2f0]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="cursor-pointer rounded-md bg-white p-2 text-[#c33c45] ring-1 ring-[#dbe2f0]">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}

          {displayedBuses.length === 0 && (
            <div className="rounded-xl border border-[#dbe2f0] bg-[#fbfcff] p-4 text-center text-sm font-medium text-[#737b8c]">
              No buses found for this search/filter.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#d8deeb] bg-[#f5f7ff] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#586579]">
          <p>
            Showing {displayedBuses.length} of {buses.length} Fleet Vehicles
          </p>
          <div className="flex gap-2">
            <button className="cursor-pointer rounded-md border border-[#ccd4e7] px-3 py-1.5 text-[#2d3545]">
              Prev
            </button>
            <button className="cursor-pointer rounded-md border border-[#ccd4e7] px-3 py-1.5 text-[#2d3545]">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function RoutesPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RouteStatus | "ALL">("ALL");
  const [sortKey, setSortKey] = useState<ConfiguredRouteSortKey>("route");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: ConfiguredRouteSortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const displayedConfiguredRoutes = useMemo(() => {
    const filtered = configuredRoutes.filter((item) => {
      const bySearch =
        searchQuery.trim() === "" ||
        `${item.route} ${item.coverage} ${item.type}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const byStatus = statusFilter === "ALL" || item.status === statusFilter;

      return bySearch && byStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortKey === "route") {
        comparison = a.route.localeCompare(b.route, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      } else if (sortKey === "coverage") {
        comparison = a.coverage.localeCompare(b.coverage);
      } else if (sortKey === "type") {
        comparison = a.type.localeCompare(b.type);
      } else {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [searchQuery, sortDirection, sortKey, statusFilter]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#cfd4e2] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-[#1f2633]">
          <ListFilter className="h-5 w-5 text-[#0a4cad]" />
          <h2 className="text-3xl font-extrabold tracking-tight max-md:text-2xl">
            Create New Route
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1.5 md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Route Name
            </span>
            <input
              type="text"
              placeholder="e.g., Downtown Express 101"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Start Stop
            </span>
            <input
              type="text"
              placeholder="Terminal A"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              End Stop
            </span>
            <input
              type="text"
              placeholder="Terminal B"
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Key Waypoints
            </span>
            <input
              type="text"
              placeholder="Comma separated stops..."
              className="w-full rounded-lg border border-[#c7cfe1] bg-[#eef2ff] px-3 py-2.5 text-sm text-[#1f2633] outline-none ring-[#0a4cad] transition focus:ring-2"
            />
          </label>

          <fieldset className="space-y-2 md:col-span-2">
            <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#586579]">
              Schedule Type
            </legend>
            <div className="flex flex-wrap gap-4 text-sm text-[#3d4558]">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  className="accent-[#0a4cad]"
                />{" "}
                Daily
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  defaultChecked
                  className="accent-[#0a4cad]"
                />
                Weekdays
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  className="accent-[#0a4cad]"
                />{" "}
                Weekend
              </label>
            </div>
          </fieldset>
        </div>

        <button className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0a4cad] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          <Save className="h-4 w-4" />
          Save Route Configuration
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#cfd4e2] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#d8deeb] p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f2633]">
            Configured Routes
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737b8c]" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-[#d4daea] bg-[#eef2ff] py-2 pl-9 pr-3 text-sm outline-none ring-[#0a4cad] transition focus:ring-2"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as RouteStatus | "ALL")
              }
              className="cursor-pointer rounded-md border border-[#d4daea] bg-[#eef2ff] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#485062] outline-none ring-[#0a4cad] focus:ring-2"
            >
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <button className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[#0a4cad] transition-opacity hover:opacity-80">
              <Map className="h-3.5 w-3.5" />
              Map View
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f1f4ff] text-[11px] font-bold uppercase tracking-[0.15em] text-[#586579]">
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("route")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "route"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Route <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("coverage")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "coverage"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Coverage <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("type")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "type"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Type <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleSort("status")}
                    className={`inline-flex cursor-pointer items-center gap-1 transition-colors ${
                      sortKey === "status"
                        ? "text-[#0a4cad]"
                        : "hover:text-[#0a4cad]"
                    }`}
                  >
                    Status <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e5f1]">
              {displayedConfiguredRoutes.map((item) => (
                <tr key={item.route} className="hover:bg-[#f9fbff]">
                  <td className="px-4 py-4 font-bold text-[#1f2633]">
                    {item.route}
                  </td>
                  <td className="px-4 py-4 text-[#5b6272]">{item.coverage}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#1f56b4]">
                    {item.type}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase ${routeStatusClass[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-1">
                      <button className="cursor-pointer rounded-md p-2 text-[#586579] transition-colors hover:bg-[#eef2ff] hover:text-[#0a4cad]">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="cursor-pointer rounded-md p-2 text-[#586579] transition-colors hover:bg-[#fff1f1] hover:text-[#c33c45]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {displayedConfiguredRoutes.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-medium text-[#737b8c]"
                  >
                    No routes found for this search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {displayedConfiguredRoutes.map((item) => (
            <article
              key={item.route}
              className="rounded-xl border border-[#dbe2f0] bg-[#fbfcff] p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="text-base font-bold text-[#1f2633]">
                  {item.route}
                </h4>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${routeStatusClass[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-[#586579]">{item.coverage}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#1f56b4]">
                {item.type}
              </p>

              <div className="mt-3 flex justify-end gap-2">
                <button className="cursor-pointer rounded-md bg-white p-2 text-[#586579] ring-1 ring-[#dbe2f0]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="cursor-pointer rounded-md bg-white p-2 text-[#c33c45] ring-1 ring-[#dbe2f0]">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}

          {displayedConfiguredRoutes.length === 0 && (
            <div className="rounded-xl border border-[#dbe2f0] bg-[#fbfcff] p-4 text-center text-sm font-medium text-[#737b8c]">
              No routes found for this search/filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("buses");

  return (
    <section className="space-y-6 md:space-y-8">
      <header>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#586579]">
          Administrator Console
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1b2435] max-md:text-3xl">
          Fleet & Route Management
        </h1>
      </header>

      <div className="border-b border-[#cdd4e4]">
        <div
          className="flex gap-5 sm:gap-6"
          role="tablist"
          aria-label="Admin Tabs"
        >
          <button
            role="tab"
            aria-selected={tab === "buses"}
            onClick={() => setTab("buses")}
            className={`inline-flex cursor-pointer items-center gap-2 border-b-2 px-1 py-2.5 text-sm font-bold transition-colors ${
              tab === "buses"
                ? "border-[#0a4cad] text-[#0a4cad]"
                : "border-transparent text-[#586579] hover:text-[#0a4cad]"
            }`}
          >
            <Bus className="h-4 w-4" />
            Buses
          </button>

          <button
            role="tab"
            aria-selected={tab === "routes"}
            onClick={() => setTab("routes")}
            className={`inline-flex cursor-pointer items-center gap-2 border-b-2 px-1 py-2.5 text-sm font-bold transition-colors ${
              tab === "routes"
                ? "border-[#0a4cad] text-[#0a4cad]"
                : "border-transparent text-[#586579] hover:text-[#0a4cad]"
            }`}
          >
            <Route className="h-4 w-4" />
            Routes
          </button>
        </div>
      </div>

      {tab === "buses" ? <BusesPanel /> : <RoutesPanel />}
    </section>
  );
}
