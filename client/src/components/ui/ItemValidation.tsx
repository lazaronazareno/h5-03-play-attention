import React from 'react';
import { CheckIcon } from '../ui/icons';

interface ItemValidationProps {
  name: string
  icon?: React.ReactNode
}

const ItemValidation = ({ name, icon }: ItemValidationProps) => {
  return (
    <div className='bg-white text-violet-main flex gap-2.5 py-2 px-4 rounded-md text-xl font-poppins'>
      {icon ? (
        <span className='text-2xl'>{icon}</span>
      ) : (
        <span className='bg-violet-main rounded-full size-5'>
          <CheckIcon size={20} color='white' />
        </span>
      )}
      <p className='font-medium'>{name}</p>
    </div>
  );
};

export default ItemValidation;