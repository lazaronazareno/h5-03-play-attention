import UserPanel from "@/components/dashboard/UserPanel";
import { ItemFileProps } from "@/interfaces/IUserPanel.interfaces";

export default function MedicalArticlesPage() {
  const items: ItemFileProps[] = [
    {
      title: "Documento PDF",
      description: "Descripción del material 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/image/upload/vqgrr6vtxvfrbbvjft1i.pdf",
      type: "document",
      fileType: "application/pdf",
    },
    {
      title: "Documento WORD",
      description: "Descripción del material 2",
      fileUrl: "https://res.cloudinary.com/db395v0wf/raw/upload/v1746326741/k28ddoily3xmxodulvac.docx",
      type: "document",
      fileType: "application/msword",
    },
  ]
  return (
    <UserPanel
      title="Artículos Médicos"
      description="En esta sección encontrarás contenido científico validado clínicamente. "
      imageUrl="/dashboard/articulos_medicos.png"
      items={items}
    />
  );
}