import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    fleetCode?: string;
    model?: string;
    capacity?: number;
    status?: "ACTIVE" | "REPAIR" | "STANDBY";
  };

  if (!body.fleetCode || !body.model || !body.capacity) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const bus = await prisma.bus.create({
    data: {
      fleetCode: body.fleetCode,
      model: body.model,
      capacity: body.capacity,
      status: body.status ?? "ACTIVE",
    },
  });

  return NextResponse.json(bus);
}
