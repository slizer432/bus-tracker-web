DO $$ BEGIN
  CREATE TYPE "BusOperationalStatus" AS ENUM ('ACTIVE', 'REPAIR', 'STANDBY');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "BusServiceStatus" AS ENUM ('NORMAL', 'WARNING', 'DELAYED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "RouteStatus" AS ENUM ('ON_SCHEDULE', 'MINOR_DELAYS', 'DELAYED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "RouteConfigStatus" AS ENUM ('ACTIVE', 'DRAFT', 'INACTIVE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "ScheduleType" AS ENUM ('WEEKDAYS', 'DAILY', 'PEAK');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- AlterTable
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'user';

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "coverage" TEXT NOT NULL,
    "status" "RouteStatus" NOT NULL DEFAULT 'ON_SCHEDULE',
    "configStatus" "RouteConfigStatus" NOT NULL DEFAULT 'ACTIVE',
    "scheduleType" "ScheduleType" NOT NULL DEFAULT 'WEEKDAYS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" TEXT NOT NULL,
    "fleetCode" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "BusOperationalStatus" NOT NULL DEFAULT 'ACTIVE',
    "serviceStatus" "BusServiceStatus" NOT NULL DEFAULT 'NORMAL',
    "etaMinutes" INTEGER,
    "lastStop" TEXT,
    "passengers" INTEGER NOT NULL DEFAULT 0,
    "heading" TEXT NOT NULL DEFAULT 'Unknown',
    "routeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_code_key" ON "Route"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_fleetCode_key" ON "Bus"("fleetCode");

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
