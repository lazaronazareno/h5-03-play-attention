'use client'
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
    <div className='flex min-h-screen w-full flex-col gap-8 px-6 pt-8'>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-end gap-4'>
          <Typography variant='h2' text={"Soporte al Cliente"} color='violet' size='title' weight='medium' />
          <Typography variant='p' text={"¿Cómo podemos ayudarte?"} color='default' size='base' weight='normal' />
        </div>
        <Image src={"/dashboard/soporte.png"} alt={"Soporte al Cliente"} width={350} height={260} className='h-24 w-28 lg:h-[260px] lg:w-[350px]' />
      </div>
      <div className='relative mt-4 flex h-full flex-col gap-4 border-t-2 border-t-violet-main bg-neutral-white2 px-4 pt-9'>
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
