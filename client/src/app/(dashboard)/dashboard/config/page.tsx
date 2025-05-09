
import ItemConfig from "@/components/dashboard/ItemConfig";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { Book, BookOpenIcon, Calendar, Star, Video, Youtube } from "lucide-react";
import Image from "next/image";

export default function ConfigPage() {
  const configOptions = [
    {
      title: "Nuevo Material Educativo",
      icon: <BookOpenIcon size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: true,
    },
    {
      title: "Nuevo Tutorial",
      icon: <Video size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: true,
    },
    {
      title: "Nuevo Video de Muestra",
      icon: <Youtube size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: false,
    },
    {
      title: "Nuevos Artículos Medicos ",
      icon: <Book size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: false,
    },
    {
      title: "Nuevo Material de Marketing",
      icon: <Star size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: true,
    },
    {
      title: "Nuevos Eventos",
      icon: <Calendar size={28} color='white' strokeWidth={2} />,
      name: "new_material",
      status: true,
    },

  ]
  return (
    <div className='flex h-full min-h-screen w-full flex-col gap-8 px-6 pb-4 pt-8'>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-end gap-4'>
          <Typography variant='h2' text={"Configuración"} color='violet' size='title' weight='medium' />
          <Typography variant='p' text={"Elegí las comunicaciones que querés recibir por este canal."} color='default' size='base' weight='normal' />
        </div>
        <Image src={"/dashboard/config.png"} alt={"Configuración"} width={350} height={260} className='h-24 w-28 lg:h-[260px] lg:w-[350px]' />
      </div>
      <div className='relative mt-4 flex h-full flex-col gap-4 border-t-2 border-t-violet-main bg-neutral-white2 px-4 pt-9'>
        <Button
          text='Guardar Cambios'
          variant='primary'
          className="justify-center self-end"
        />
        {configOptions.length > 0 ? (
          <>
            {configOptions.map((item, index) => (
              <ItemConfig
                title={item.title}
                icon={item.icon}
                status={item.status}
                name={item.name}
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
