import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ routeId: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { routeId } = await params;

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    code?: string;
    name?: string;
    coverage?: string;
    direction?: string;
    scheduleType?: "WEEKDAYS" | "DAILY" | "PEAK";
    configStatus?: "ACTIVE" | "DRAFT" | "INACTIVE";
    status?: "ON_SCHEDULE" | "MINOR_DELAYS" | "DELAYED";
  };

  if (body.direction === undefined) {
    return NextResponse.json({ error: "Missing direction" }, { status: 400 });
  }

  const route = await prisma.route.update({
    where: { id: routeId },
    data: {
      code: body.code,
      name: body.name,
      coverage: body.coverage,
      direction: body.direction,
      scheduleType: body.scheduleType,
      configStatus: body.configStatus,
      status: body.status,
    },
  });

  return NextResponse.json(route);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ routeId: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { routeId } = await params;

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.route.delete({
    where: { id: routeId },
  });

  return NextResponse.json({ ok: true });
}
