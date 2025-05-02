import React from 'react';
import Typography from '../ui/Typography';
import Image from 'next/image';
import { UserPanelItem, UserPanelProps } from '@/interfaces/IUserPanel.interfaces';


function UserPanel<T extends UserPanelItem>({ title, description, imageUrl, items }: UserPanelProps<T>) {
  return (
    <div className='flex flex-col px-6 pt-8 gap-8 h-screen w-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4 justify-end'>
          <Typography variant='h2' text={title} color='violet' size='title' weight='medium' className='w-1/2' />
          <Typography variant='p' text={description} color='default' size='base' weight='normal' className='md:w-2/3' />
        </div>
        <Image src={imageUrl} alt={title} width={350} height={260} className='w-28 h-24 lg:w-[350px] lg:h-[260px]' />
      </div>
      <div className='flex flex-col gap-4 mt-4 border-t-2 border-t-violet-main bg-neutral-white2 h-full px-4 pt-9'>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <div key={index} className='flex items-center gap-4'>
                <Typography variant='p' text={item.title} color='default' size='base' weight='normal' />
              </div>
            ))}
          </>
        ) : (
          <Typography variant='p' text='No se encontraron recursos actualmente' color='violet' size='base' weight='medium' />
        )}
      </div>
    </div>
  );
};

export default UserPanel;