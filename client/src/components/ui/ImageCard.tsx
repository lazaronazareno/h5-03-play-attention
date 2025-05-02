import Image from 'next/image';
import React from 'react';
import Typography from './Typography';

interface ImageCardProps {
  imageUrl: string;
  name: string;
  degree?: string;
  job?: string;
  description: string;
  position?: "up" | "down";
}

const ImageCard = ({ imageUrl, name, degree, job, description, position }: ImageCardProps) => {
  return (
    <div className={`bg-violet-secondary shadow-main rounded-tl-4xl rounded-br-2xl py-4 text-center gap-1 flex flex-col h-fit 
      ${position && position === "down" && "mt-9 xl:mt-0 xl:mb-12"} 
    ${position && position === "up" && "mb-6 xl:mb-0 xl:mt-12"}`}>
      <Image
        src={imageUrl}
        alt={name}
        width={250}
        height={250}
        className='w-full rounded-4xl px-4 pb-2'
      />
      <Typography
        variant='p'
        color='white'
        size='base'
        text={name}
        weight='semibold'
        className='uppercase'
      />
      {degree && (
        <Typography
          variant='p'
          color='white'
          size='sm'
          text={degree}
          weight='normal'
        />
      )}
      {job && (
        <Typography
          variant='p'
          color='white'
          size='sm'
          text={job}
          weight='normal'
        />
      )}
      <Typography
        variant='p'
        color='white'
        size='sm'
        text={description}
        weight='normal'
      />
    </div>
  );
};

export default ImageCard;