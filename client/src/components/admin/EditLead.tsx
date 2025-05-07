import React from 'react';
import { Input } from '../inputs/Input';
import Typography from '../ui/Typography';
import { Camera, Pen } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';

const EditLead = () => {
  return (
    <div className='flex flex-col gap-4 min-w-[345px] h-min bg-neutral-white2 border border-violet-main rounded-md shadow-main p-4'>
      <div className='relative flex justify-center rounded-full w-max cursor-pointer border border-violet-main overflow-hidden self-center'>
        <Image src="/landing/testimonies/1.png" alt="Lead" width={141} height={141} className="rounded-full bg-green-300" />
        <Camera size={24} className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-300 rounded-b-full w-32 text-white' />
      </div>
      <div>
        <Typography variant='p' text='Nombre' weight='semibold' size='sm' color='green' className='mb-2' />
        <Input
          type='text'
          placeholder='Escriba nuevo nombre'
          icon={<Pen size={20} className='text-violet-main' />}
          onSubmit={(value) => console.log(value)}
        />
      </div>
      <div>
        <Typography variant='p' text='Apellido' weight='semibold' size='sm' color='green' className='mb-2' />
        <Input
          type='text'
          placeholder='Escriba nuevo apellido'
          icon={<Pen size={20} className='text-violet-main' />}
          onSubmit={(value) => console.log(value)}
        />
      </div>
      <div>
        <Typography variant='p' text='Número de telefono' weight='semibold' size='sm' color='green' className='mb-2' />
        <Input
          type='text'
          placeholder='Escriba nuevo número de teléfono'
          icon={<Pen size={20} className='text-violet-main' />}
          onSubmit={(value) => console.log(value)}
        />
      </div>
      <div>
        <Typography variant='p' text='E-mail' weight='semibold' size='sm' color='green' className='mb-2' />
        <Input
          type='text'
          placeholder='Escribe nuevo e-mail'
          icon={<Pen size={20} className='text-violet-main' />}
          onSubmit={(value) => console.log(value)}
        />
      </div>
      <div className='flex gap-2 h-12 mt-4'>
        <Button variant='primary' text='Aplicar' className='flex-1 !py-0 items-center justify-center font-semibold' />
        <Button variant='secondary' text='Cancelar' className='flex-1 !py-0 items-center justify-center font-semibold' />
      </div>
    </div>
  );
};

export default EditLead;