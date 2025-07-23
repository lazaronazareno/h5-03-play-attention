import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function MedicalArticlesPage() {
  const items = await getContentByType("ARTICLE");

  return (
    <UserPanel
      title="Artículos Médicos"
      description="En esta sección encontrarás contenido científico validado clínicamente. "
      imageUrl="/dashboard/articulos_medicos.png"
      items={items}
    />
  );
}