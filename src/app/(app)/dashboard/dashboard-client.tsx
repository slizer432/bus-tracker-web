'use client';

import BusCard from "@/components/BusCard";
import { useMqttContext } from "@/lib/iot";

interface FleetCard {
  id: string;
  busCode: string;
  rfidTag: string;
  route: string;
  nextArrival: string;
  lastStop: string;
  passengers: number;
  capacity: number;
  heading: string;
  status: "normal" | "warning" | "delayed";
}

interface DashboardClientProps {
  fleetCards: FleetCard[];
  stopsMap: Record<string, string>;
}

/**
 * Finds a matching entry in a Map by trying exact match first,
 * then case-insensitive/trimmed match. Handles format differences
 * between database values and MQTT payload values.
 */
function findInMap<T>(map: Map<string, T>, key: string): T | undefined {
  // Exact match
  const exact = map.get(key);
  if (exact) return exact;

  // Normalized fallback (trim whitespace, case-insensitive)
  const keyNorm = key.trim().toLowerCase();
  for (const [k, v] of map.entries()) {
    if (k.trim().toLowerCase() === keyNorm) return v;
  }
  return undefined;
}

export default function DashboardClient({ fleetCards, stopsMap }: DashboardClientProps) {
  const { busRFIDs, busPassengers, busHeartbeats, isConnected, lastUpdate } = useMqttContext();

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
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            MQTT: {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          {lastUpdate && (
            <span className="text-xs text-[#586579]">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fleetCards.length === 0 ? (
          <div className="rounded-xl border border-[#dbe2f9] bg-white p-6 text-sm font-semibold text-[#586579]">
            No buses have been added yet.
          </div>
        ) : (
          fleetCards.map((bus) => {
            // RFID lookup: busRFIDs is keyed by UID, bus.rfidTag is the UID from database
            const rfid = findInMap(busRFIDs, bus.rfidTag);

            // Passenger lookup: busPassengers is now keyed by UID (same as rfidTag)
            const passenger = findInMap(busPassengers, bus.rfidTag);

            // Heartbeat lookup
            const heartbeat = findInMap(busHeartbeats, bus.busCode);

            // Merge realtime data into existing card props (no new cards created)
            const realtimePassengers = passenger?.totalPassengers ?? bus.passengers;
            const realtimeLastStop = rfid ? (stopsMap[rfid.stopId] ?? rfid.stopId) : bus.lastStop;

            return (
              <div key={bus.id} className="relative">
                <BusCard
                  busId={bus.busCode}
                  route={bus.route}
                  nextArrival={bus.nextArrival}
                  lastStop={realtimeLastStop}
                  passengers={realtimePassengers}
                  capacity={bus.capacity}
                  heading={bus.heading}
                  status={bus.status}
                />
                {rfid && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    At {stopsMap[rfid.stopId] ?? rfid.stopId}
                  </div>
                )}
                {heartbeat && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    Online
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}