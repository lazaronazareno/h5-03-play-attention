import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function EducationalMaterialPage() {
  const items = await getContentByType("DOCUMENT");
  return (
    <UserPanel
      title="Material Educativo"
      description="En esta sección encontrarás documentos, presentaciones y guías de uso. "
      imageUrl="/dashboard/material_educativo.png"
      items={items}
    />
  );
}