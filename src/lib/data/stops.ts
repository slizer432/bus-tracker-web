import { prisma } from "@/lib/prisma";

type StopQueryResult = {
  id: string;
  name: string;
};

/**
 * Returns a plain object mapping stopId -> stop name.
 * Used by dashboard client to resolve stopId from MQTT RFID payload to readable name.
 */
export async function getStopsMap(): Promise<Record<string, string>> {
  const stops = await prisma.stop.findMany({
    select: {
      id: true,
      name: true,
    },
  }) as unknown as StopQueryResult[];

  const map: Record<string, string> = {};
  for (const stop of stops) {
    map[stop.id] = stop.name;
  }
  return map;
}
