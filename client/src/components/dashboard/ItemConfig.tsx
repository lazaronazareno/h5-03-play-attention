'use client'
import React from 'react';
import Typography from '../ui/Typography';
import { Settings } from 'lucide-react';

interface ItemConfigProps {
  title: string;
  icon?: React.ReactNode;
  status?: boolean;
  name: string;
}

const ItemConfig = ({ title, icon, status, name }: ItemConfigProps) => {
  const [currentStatus, setCurrentStatus] = React.useState(status);
  return (
    <>
      <div className='shadow-main flex items-center gap-2.5 rounded-md border-2 border-green-main bg-white p-2 lg:px-3 lg:py-2.5'>
        <div className='size-11 flex items-center justify-center rounded-full bg-green-main'>
          {icon ? icon : <Settings size={32} color='white' strokeWidth={2} />}
        </div>
        <Typography
          text={title}
          variant='h3'
          color='violet'
          size='small-title'
          weight='semibold'
        />
        <div className='ms-auto'>
          <label className="inline-flex cursor-pointer items-center" >
            <input type="checkbox" value={name} className="peer sr-only" checked={currentStatus} onChange={() => setCurrentStatus(!currentStatus)} />
            <div className="inset-ring-2 inset-ring-violet-main peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-violet-main after:transition-all after:content-[''] peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-violet-main/50 dark:peer-checked:bg-white" />
          </label>
        </div>
      </div>
    </>
  );
};

export default ItemConfig;
