import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function ActivitiesPage() {
  const Items = await getContentByType("ACTIVITY")
  console.log(Items)
  return (
    <UserPanel
      title="Actividades"
      description="En esta sección encontrarás ejercicios interactivos complementarios."
      imageUrl="/dashboard/actividades.png"
      items={Items}
    />
  );
}