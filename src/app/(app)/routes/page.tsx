import RoutesClientPage from "@/app/(app)/routes/routes-client";
import { getRoutesOverview } from "@/lib/data/routes";

export default async function RoutesPage() {
  const routesData = await getRoutesOverview();

  return <RoutesClientPage routesData={routesData} />;
}
