import React from 'react';
import { CheckIcon } from '../ui/icons';

interface ItemValidationProps {
  name: string
  icon?: React.ReactNode
  className?: string
}

const ItemValidation = ({ name, icon, className }: ItemValidationProps) => {
  return (
    <div className={`bg-white text-violet-main border border-violet-main flex items-center gap-2.5 py-2 px-4 rounded-md text-xl font-poppins font-medium ${className}`}>
      {icon ? (
        <span className='text-2xl'>{icon}</span>
      ) : (
        <span className='bg-violet-main rounded-full size-5 flex justify-center items-center'>
          <CheckIcon size={18} color='white' strokeWidth={3} />
        </span>
      )}
      <p className='font-medium'>{name}</p>
    </div>
  );
};

export default ItemValidation;