import AdminClientPage from "@/app/(app)/admin/admin-client";
import { getAdminBuses, getAdminRoutes } from "@/lib/data/admin";

export default async function AdminPage() {
  const [buses, configuredRoutes] = await Promise.all([
    getAdminBuses(),
    getAdminRoutes(),
  ]);

  return (
    <AdminClientPage buses={buses} configuredRoutes={configuredRoutes} />
  );
}
