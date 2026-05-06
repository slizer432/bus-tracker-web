import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ busId: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { busId } = await params;

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    fleetCode?: string;
    model?: string;
    capacity?: number;
    status?: "ACTIVE" | "REPAIR" | "STANDBY";
  };

  const bus = await prisma.bus.update({
    where: { id: busId },
    data: {
      fleetCode: body.fleetCode,
      model: body.model,
      capacity: body.capacity,
      status: body.status,
    },
  });

  return NextResponse.json(bus);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ busId: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { busId } = await params;

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.bus.delete({
    where: { id: busId },
  });

  return NextResponse.json({ ok: true });
}
