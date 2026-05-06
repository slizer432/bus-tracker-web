import { prisma } from "@/lib/prisma";

export type BusCardSummary = {
  id: string;
  route: string;
  eta: string;
  lastStop: string;
  passengers: number;
  capacity: number;
  heading: string;
  status: "normal" | "warning" | "delayed";
};

export async function getBusCards() {
  const buses = await prisma.bus.findMany({
    include: {
      route: {
        select: {
          code: true,
          name: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return buses.map<BusCardSummary>((bus) => {
    const etaText =
      typeof bus.etaMinutes === "number"
        ? `${bus.etaMinutes} mins`
        : "Delayed";
    const statusLabel = bus.serviceStatus.toLowerCase() as
      | "normal"
      | "warning"
      | "delayed";

    return {
      id: bus.id,
      route: bus.route
        ? `Route ${bus.route.code}`
        : "Unassigned",
      eta: etaText,
      lastStop: bus.lastStop ?? "Unknown",
      passengers: bus.passengers,
      capacity: bus.capacity,
      heading: bus.heading,
      status: statusLabel,
    };
  });
}

export async function getFleetSummary() {
  const counts = await prisma.bus.groupBy({
    by: ["serviceStatus"],
    _count: { serviceStatus: true },
  });

  const delayedCount = counts.reduce(
    (total, item) =>
      item.serviceStatus === "DELAYED"
        ? total + item._count.serviceStatus
        : total,
    0,
  );

  const totalCount = counts.reduce(
    (total, item) => total + item._count.serviceStatus,
    0,
  );

  const activeCount = Math.max(0, totalCount - delayedCount);

  return {
    delayedCount,
    activeCount,
  };
}
