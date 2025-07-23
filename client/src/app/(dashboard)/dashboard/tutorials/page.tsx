import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function TutorialsPage() {
  const items = await getContentByType("VIDEO")
  return (
    <UserPanel
      title="Tutoriales"
      description="En esta sección encontrarás videos que te indican los pasos a seguir para la instalación y el uso del sistema."
      imageUrl="/dashboard/tutoriales.png"
      items={items}
    />
  );
}