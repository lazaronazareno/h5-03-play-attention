'use client'
import EmailForm from "@/components/admin/EmailForm";
import ItemDefault from "@/components/dashboard/ItemDefault";
import Typography from "@/components/ui/Typography";
import { IUser } from "@/interfaces/IAdmin.interfaces";
import { getUserData } from "@/services/admin/getToken";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SupportPage() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const OPTIONS = [
    {
      title: "Soporte ",
      icon: <MessageCircle size={28} color='white' strokeWidth={2} />,
      children: <EmailForm type="Soporte" users={["soportePlayattention@gmail.com"]} from={user?.email} />
    },
  ]

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
              <div key={index} className="relative">
                <ItemDefault
                  title={item.title}
                  icon={item.icon}
                  component={item.children}
                />
              </div>
            ))}
          </>
        ) : (
          <Typography variant='p' text='No se encontraron recursos actualmente' color='violet' size='base' weight='medium' />
        )}
      </div>
    </div>
  );
}
