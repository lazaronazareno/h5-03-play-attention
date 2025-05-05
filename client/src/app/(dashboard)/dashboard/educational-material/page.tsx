import UserPanel from "@/components/dashboard/UserPanel";
import { ItemFileProps } from "@/interfaces/IUserPanel.interfaces";

export default function EducationalMaterialPage() {
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
    {
      title: "Imagen de Play Attention",
      description: "Descripción de la imagen 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/image/upload/v1746342963/kboacolxygcs9rqi7xjs.png",
      type: "image",
      fileType: "image/png",
    },
    {
      title: "Video de Play Attention",
      description: "Play Attention - Video 1",
      fileUrl: "https://res.cloudinary.com/db395v0wf/video/upload/v1746336117/bxj3o9kptqfawaa84dnp.mp4",
      type: "video",
      fileType: "video/mp4",
      transcription: {
        transcription: {
          languages: [
            "en"
          ],
          subtitles: [
            {
              format: "vtt",
              subtitles: "WEBVTT\n\n1\n00:00:00.448 --> 00:00:01.929\nThis message is for you.\n\n2\n00:00:03.889 --> 00:00:07.311\nFrom what I hear, you're an amazing\nperson.\n\n3\n00:00:08.751 --> 00:00:12.913\nNever let them call you lazy, unmotivated,\nor troubled.\n\n4\n00:00:13.313 --> 00:00:19.896\nDo not let labels like ADHD or weak\nexecutive function define who you are.\n\n5\n00:00:21.037 --> 00:00:24.518\nWhen they compare you to your peers, tune\nit out.\n\n6\n00:00:25.278 --> 00:00:28.940\nWhen they say you'll never reach your\npotential, store it away.\n\n7\n00:00:30.464 --> 00:00:35.147\nCompare yourself to nobody but the person\nin the mirror.\n\n8\n00:00:37.269 --> 00:00:40.731\nThe one that thinks outside the box, is\npassionate,\n\n9\n00:00:41.492 --> 00:00:48.296\nand believes that who you are today is\njust a glimpse of who you are going to\n\n10\n00:00:48.296 --> 00:00:48.476\nbecome.\n\n11\n00:00:49.697 --> 00:00:52.119\nIt's your time to shine.\n\n12\n00:00:53.740 --> 00:00:54.941\nThey'll never see you coming.\n\n13\n00:00:56.102 --> 00:00:56.802\nFocus.\n\n14\n00:00:57.222 --> 00:00:57.922\nAchieve.\n\n15\n00:00:58.623 --> 00:00:59.323\nBecome.\n\n16\n00:00:59.848 --> 00:01:00.649\namazing.\n\n17\n00:01:01.510 --> 00:01:08.476\nCall Play Attention at 676-2240\n\n18\n00:01:08.477 --> 00:01:12.760\nor visit www.playattention.com\n"
            }
          ]
        },
        translation: {
          languages: [
            "es"
          ],
          subtitles: [
            {
              format: "vtt",
              subtitles: "WEBVTT\n\n1\n00:00:00.448 --> 00:00:01.929\nEste mensaje es para ti.\n\n2\n00:00:03.889 --> 00:00:07.311\nPor lo que escucho, eres una persona\nincreíble.\n\n3\n00:00:08.751 --> 00:00:12.913\nNunca dejes que te llamen perezoso,\ndesmotivado o problemático.\n\n4\n00:00:13.313 --> 00:00:19.896\nNo dejes que etiquetas como TDAH o función\nejecutiva débil definan quién eres.\n\n5\n00:00:21.037 --> 00:00:24.518\nCuando te comparen con tus compañeros,\nignóralo.\n\n6\n00:00:25.278 --> 00:00:28.940\nCuando te digan que nunca alcanzarás tu\npotencial, guárdalo.\n\n7\n00:00:30.464 --> 00:00:35.147\nCompárate solo con la persona en el\nespejo.\n\n8\n00:00:37.269 --> 00:00:40.731\nEl que piensa fuera de la caja, es\n\n9\n00:00:41.492 --> 00:00:48.296\napasionado, y cree que quien eres hoy es\nsolo un vistazo de quien vas a llegar a\n\n10\n00:00:48.296 --> 00:00:48.476\nser.\n\n11\n00:00:49.697 --> 00:00:52.119\nEs tu momento de brillar.\n\n12\n00:00:53.740 --> 00:00:54.941\nNunca te verán venir.\n\n13\n00:00:56.102 --> 00:00:56.802\nConcéntrate.\n\n14\n00:00:57.222 --> 00:00:57.922\nLograr.\n\n15\n00:00:58.623 --> 00:00:59.323\nConviértete.\n\n16\n00:00:59.848 --> 00:01:00.649\n¡Increíble!\n\n17\n00:01:01.510 --> 00:01:08.476\nLlame a Play Attention al 676-2240\n\n18\n00:01:08.477 --> 00:01:12.760\no visite www.playattention.com.\n"
            }
          ]
        },
      }
    },
  ]
  return (
    <UserPanel
      title="Material Educativo"
      description="En esta sección encontrarás documentos, presentaciones y guías de uso. "
      imageUrl="/dashboard/material_educativo.png"
      items={items}
    />
  );
}