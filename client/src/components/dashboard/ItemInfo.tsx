import React from 'react';
import Typography from '../ui/Typography';
import { CheckIcon } from 'lucide-react';

interface ItemInfoProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ItemInfo = ({ title, description, icon }: ItemInfoProps) => {
  return (
    <>
      <div className='shadow-main flex w-full gap-2.5 rounded-md border-2 border-green-main bg-white p-2 lg:px-3 lg:py-2.5'>
        {
          icon
            ? <span className='mr-1 mt-2 lg:mr-2'>{icon}</span>
            : <span className='size-5 mt-2 flex items-center justify-center rounded-full bg-green-main'>
              <CheckIcon size={18} color='white' strokeWidth={3} />
            </span>
        }
        <div className='flex flex-col'>
          <Typography text={title} variant='h3' color='violet' size='small-title' weight='semibold' />
          <Typography text={description} variant='p' color='default' size='sm' weight='normal' />
        </div>
      </div>
    </>
  );
};

export default ItemInfo;
