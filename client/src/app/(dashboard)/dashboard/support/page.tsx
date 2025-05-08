import ItemDefault from "@/components/dashboard/ItemDefault";
import { LeadForm } from "@/components/form-leads/LeadsForm";
import Typography from "@/components/ui/Typography";
import { FileText, MessageCircle, MessageSquare } from "lucide-react";
import Image from "next/image";

const OPTIONS = [
  {
    title: "Formulario de contacto",
    icon: <FileText size={28} color='white' strokeWidth={2} />,
    children: <LeadForm type="INDIVIDUAL" handleLeadClick={() => { }} />
  },
  {
    title: "Chat en vivo",
    icon: <MessageCircle size={28} color='white' strokeWidth={2} />,
  },
  {
    title: "Foro",
    icon: <MessageSquare size={28} color='white' strokeWidth={2} />,
  },
]

export default function SupportPage() {
  return (
    <div className='flex flex-col px-6 pt-8 gap-8 min-h-screen w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4 justify-end'>
          <Typography variant='h2' text={"Soporte al Cliente"} color='violet' size='title' weight='medium' />
          <Typography variant='p' text={"¿Cómo podemos ayudarte?"} color='default' size='base' weight='normal' />
        </div>
        <Image src={"/dashboard/soporte.png"} alt={"Soporte al Cliente"} width={350} height={260} className='w-28 h-24 lg:w-[350px] lg:h-[260px]' />
      </div>
      <div className='relative flex flex-col gap-4 mt-4 border-t-2 border-t-violet-main bg-neutral-white2 h-full px-4 pt-9'>
        {OPTIONS.length > 0 ? (
          <>
            {OPTIONS.map((item, index) => (
              <ItemDefault
                title={item.title}
                icon={item.icon}
                component={item.children}
                key={index}
              />
            ))}
          </>
        ) : (
          <Typography variant='p' text='No se encontraron recursos actualmente' color='violet' size='base' weight='medium' />
        )}
      </div>
    </div>
  );
}