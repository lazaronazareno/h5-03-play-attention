import React from 'react';
import quotesImage from '/public/landing/quotes.png';
import Image from 'next/image';
import Typography from './Typography';

export interface TestimonyCardProps {
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  name: string;
  age: number;
  location: string;
}

const TestimonyCard = ({ title, description, author, imageUrl, name, age, location }: TestimonyCardProps) => {
  return (
    <div className='flex flex-wrap-reverse md:flex-nowrap items-center justify-center w-xs min-h-[450px] md:w-[520px] lg:w-[920px] gap-2 bg-green-300/10 rounded-md shadow-main border-2 border-green-300 px-2 md:px-16 py-4'>
      <div className='flex flex-col gap-2.5 md:gap-6'>
        <Image src={quotesImage} alt="Quotes" width={20} height={14} className='w-5 md:min-w-12' />
        <Typography variant='h3' color='default' size='base' text={`«${title}»`} weight='semibold' />
        <Typography variant='p' color='default' size='sm' text={description} weight='normal' />
        <Typography variant='p' color='default' size='sm' text={author} weight='semibold' className='border-b border-dotted w-fit' />
      </div>
      <div className='flex flex-col items-center gap-1 md:gap-2'>
        <Image src={imageUrl} alt="Testimony" width={244} height={244} className='w-[150px] md:min-w-[244px] rounded-full bg-green-300' />
        <Typography variant='h3' color='default' size='base' text={name} weight='semibold' />
        <Typography variant='p' color='default' size='sm' text={`${age} años | ${location}`} weight='normal' className='text-neutral-500' />
      </div>
    </div>
  );
};

export default TestimonyCard;