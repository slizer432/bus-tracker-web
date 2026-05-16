import { getBusCards } from "@/lib/data/buses";
import { getStopsMap } from "@/lib/data/stops";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const [fleetCards, stopsMap] = await Promise.all([
    getBusCards(),
    getStopsMap(),
  ]);

  return <DashboardClient fleetCards={fleetCards} stopsMap={stopsMap} />;
}
