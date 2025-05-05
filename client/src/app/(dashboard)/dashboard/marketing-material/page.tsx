import UserPanel from "@/components/dashboard/UserPanel";
import { ItemFileProps } from "@/interfaces/IUserPanel.interfaces";

export default function MarketingMaterialPage() {
  const items: ItemFileProps[] = [
    {
      title: "Documento PDF",
      description: "Descripción del material 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/image/upload/vqgrr6vtxvfrbbvjft1i.pdf",
      type: "document",
      fileType: "application/pdf",
    },
    {
      title: "Imagen de Play Attention",
      description: "Descripción de la imagen 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/image/upload/v1746342963/kboacolxygcs9rqi7xjs.png",
      type: "image",
      fileType: "image/png",
    },
    {
      title: "Imagen de Play Attention",
      description: "Descripción de la imagen 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/image/upload/v1746342963/kboacolxygcs9rqi7xjs.png",
      type: "image",
      fileType: "image/png",
    },
  ]
  return (
    <UserPanel
      title="Material de Marketing"
      description="En esta sección encontrarás banners, imágenes, folletos digitales para uso profesional o para empresas."
      imageUrl="/dashboard/marketing.png"
      items={items}
    />
  );
}