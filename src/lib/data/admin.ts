import { prisma } from "@/lib/prisma";

export type AdminBusItem = {
  id: string;
  fleetCode: string;
  model: string;
  capacity: number;
  status: "ACTIVE" | "REPAIR" | "STANDBY";
};

export type AdminRouteItem = {
  id: string;
  code: string;
  name: string;
  routeLabel: string;
  direction: string;
  coverage: string;
  type: "WEEKDAYS" | "DAILY" | "PEAK";
  status: "ACTIVE" | "DRAFT" | "INACTIVE";
};

export async function getAdminBuses(): Promise<AdminBusItem[]> {
  const buses = await prisma.bus.findMany({
    select: {
      id: true,
      fleetCode: true,
      model: true,
      capacity: true,
      status: true,
    },
    orderBy: { fleetCode: "asc" },
  });

  return buses.map((bus) => ({
    id: bus.id,
    fleetCode: bus.fleetCode,
    model: bus.model,
    capacity: bus.capacity,
    status: bus.status,
  }));
}

export async function getAdminRoutes(): Promise<AdminRouteItem[]> {
  const routes = await prisma.route.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      coverage: true,
      direction: true,
      scheduleType: true,
      configStatus: true,
    },
    orderBy: { code: "asc" },
  });

  return routes.map((route) => ({
    id: route.id,
    code: route.code,
    name: route.name,
    routeLabel: `${route.code} - ${route.name}`,
    direction: route.direction,
    coverage: route.coverage,
    type: route.scheduleType,
    status: route.configStatus,
  }));
}
