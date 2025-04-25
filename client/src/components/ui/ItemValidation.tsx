import React from 'react';
import { CheckIcon } from '../ui/icons';

interface ItemValidationProps {
  name: string
  icon?: React.ReactNode
}

const ItemValidation = ({ name, icon }: ItemValidationProps) => {
  return (
    <div className='bg-white text-[#6A49F6] flex gap-2.5 py-2 px-4 rounded-md'>
      {icon ? (
        <span className='text-2xl'>{icon}</span>
      ) : (
        <span className='bg-[#6A49F6] rounded-full size-5'>
          <CheckIcon size={20} color='white' />
        </span>
      )}
      <p className='uppercase font-medium'>{name}</p>
    </div>
  );
};

export default ItemValidation;