import ItemInfo from "@/components/dashboard/ItemInfo";
import Typography from "@/components/ui/Typography";
import Image from "next/image";

export default function EventsPage() {
  const events = [
    {
      title: "10/05/2025 | 15:00: Evento 1",
      description: "Descripción del evento 1",
    },
    {
      title: "11/05/2025 | 13:00: Evento 2",
      description: "Descripción del evento 2",
    },
    {
      title: "12/05/2025 | 12:00: Evento 3",
      description: "Descripción del evento 3",
    }
  ]
  return (
    <div className='flex flex-col px-6 pb-4 pt-8 gap-8 min-h-screen h-full w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4 justify-end'>
          <Typography variant='h2' text={"Eventos"} color='violet' size='title' weight='medium' />
          <Typography variant='p' text={"Aquí visualizaras un candelario con los eventos, entrenamientos, webinars, etc."} color='default' size='base' weight='normal' />
        </div>
        <Image src={"/dashboard/eventos.png"} alt={"Eventos"} width={350} height={260} className='w-28 h-24 lg:w-[350px] lg:h-[260px]' />
      </div>
      <div className='relative flex mt-4 border-t-2 border-t-violet-main bg-neutral-white2 w-full h-full px-4 pt-9 gap-4'>
        <div className="flex flex-2 flex-col gap-4 w-full">
          {events.length > 0 ? (
            <>
              {events.map((item, index) => (
                <ItemInfo
                  title={item.title}
                  description={item.description}
                  key={index}
                />
              ))}
            </>
          ) : (
            <Typography variant='p' text='No se encontraron recursos actualmente' color='violet' size='base' weight='medium' />
          )}
        </div>
        {/* reemplazar por un calendario de verdad */}
        <div className="flex-1 bg-violet-main/20 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium ">
              <div>Do</div>
              <div>Lu</div>
              <div>Ma</div>
              <div>Mi</div>
              <div>Ju</div>
              <div>Vi</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2 text-center">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded-full ${i === 9 || i === 10 || i === 11 ? "bg-white text-violet-main font-bold" : ""
                    }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
 */