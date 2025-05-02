import Image from 'next/image';
import React from 'react';
import Typography from './Typography';

interface ItemTechnologyProps {
  name: string;
  image: string;
}

const ItemTechnology = ({ name, image }: ItemTechnologyProps) => {
  return (
    <div className='flex flex-col items-center justify-center bg-green-300 size-[215px] rounded-md shadow-main'>
      <Image
        src={image}
        alt={name}
        width={100}
        height={120}
        className='w-24 object-cover'
      />
      <Typography
        variant='p'
        color='white'
        size='sm'
        text={name}
        weight='semibold'
        className='px-8 !text-base'
      />
    </div>
  );
};

export default ItemTechnology;