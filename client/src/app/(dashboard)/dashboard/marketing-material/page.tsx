import UserPanel from "@/components/dashboard/UserPanel";
import { getContentByType } from "@/services/admin/getContent";

export default async function MarketingMaterialPage() {
  const items = await getContentByType("MARKETING");

  return (
    <UserPanel
      title="Material de Marketing"
      description="En esta sección encontrarás banners, imágenes, folletos digitales para uso profesional o para empresas."
      imageUrl="/dashboard/marketing.png"
      items={items}
    />
  );
}