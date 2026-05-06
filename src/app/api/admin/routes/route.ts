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
    code?: string;
    name?: string;
    coverage?: string;
    direction?: string;
    scheduleType?: "WEEKDAYS" | "DAILY" | "PEAK";
    configStatus?: "ACTIVE" | "DRAFT" | "INACTIVE";
    status?: "ON_SCHEDULE" | "MINOR_DELAYS" | "DELAYED";
  };

  if (!body.code || !body.name || !body.coverage || !body.direction) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const route = await prisma.route.create({
    data: {
      code: body.code,
      name: body.name,
      coverage: body.coverage,
      direction: body.direction,
      scheduleType: body.scheduleType ?? "WEEKDAYS",
      configStatus: body.configStatus ?? "ACTIVE",
      status: body.status ?? "ON_SCHEDULE",
    },
  });

  return NextResponse.json(route);
}
