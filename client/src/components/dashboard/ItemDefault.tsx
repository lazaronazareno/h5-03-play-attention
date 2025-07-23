'use client'
import React from 'react';
import Typography from '../ui/Typography';
import { RightArrow } from '../ui/icons';
import { Settings } from 'lucide-react';

interface ItemDefaultProps {
  title: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
}

const ItemDefault = ({ title, icon, component }: ItemDefaultProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className='shadow-main flex cursor-pointer items-center gap-2.5 rounded-md border-2 border-green-main bg-white p-2 hover:bg-green-main/10 lg:px-3 lg:py-2.5' onClick={() => setIsOpen(!isOpen)}>
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
        {!isOpen ? (
          <RightArrow
            size={24}
            className='ms-auto text-green-main'
          />
        ) : (
          <RightArrow
            size={24}
            className='ms-auto rotate-90 text-green-main'
          />
        )}
      </div>
      {isOpen && component && (
        <div className='h-min w-full py-4'>
          {component}
        </div>
      )
      }
    </>
  );
};

export default ItemDefault;
