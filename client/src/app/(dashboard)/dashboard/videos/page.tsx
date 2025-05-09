import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function EducationalMaterialPage() {
  const items = await getContentByType("VIDEO")

  return (
    <UserPanel
      title="Videos de Muestra"
      description="En esta sección encontrarás videos donde podes visualizar ejercicios y casos de éxito."
      imageUrl="/dashboard/materiales.png"
      items={items}
    />
  );
}