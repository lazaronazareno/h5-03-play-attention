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
      <div className='flex bg-white shadow-main border-2 border-green-main rounded-md p-2 lg:px-3 lg:py-2.5 gap-2.5 items-center'>
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
          <label className="inline-flex items-center cursor-pointer" >
            <input type="checkbox" value={name} className="sr-only peer" checked={currentStatus} onChange={() => setCurrentStatus(!currentStatus)} />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-violet-main/50 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-violet-main after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white dark:peer-checked:bg-white inset-ring-2 inset-ring-violet-main" />
          </label>
        </div>
      </div>
    </>
  );
};

export default ItemConfig;