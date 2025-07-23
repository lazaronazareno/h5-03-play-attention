import React from 'react';
import Typography from '../ui/Typography';
import Image from 'next/image';
import { UserPanelProps } from '@/interfaces/IUserPanel.interfaces';
import ItemFile from './ItemFile';
import { getActivityType, getFileType } from '../utils/crmUtils';
import { IContent } from '@/interfaces/IAdmin.interfaces';


function UserPanel<T extends IContent>({ title, description, imageUrl, items }: UserPanelProps<T>) {
  console.log("items", items);
  return (
    <div className='flex h-screen w-full flex-col gap-8 px-6 pt-8'>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-end gap-4'>
          <Typography variant='h2' text={title} color='violet' size='title' weight='medium' className='w-1/2' />
          <Typography variant='p' text={description} color='default' size='base' weight='normal' className='md:w-2/3' />
        </div>
        <Image src={imageUrl} alt={title} width={350} height={260} className='h-24 w-28 lg:h-[260px] lg:w-[350px]' />
      </div>
      <div className='relative mt-4 flex h-full flex-col gap-4 border-t-2 border-t-violet-main bg-neutral-white2 px-4 pt-9'>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <div key={index} className='shadow-main rounded-md border-2 border-green-main bg-white p-2 lg:px-3 lg:py-2.5'>
                <ItemFile
                  title={item.title}
                  description={item.description}
                  type={getActivityType(item.contentType)}
                  fileUrl={item.filePath}
                  fileType={getFileType(item.filePath)}
                  id={item.id}
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
};

export default UserPanel;
