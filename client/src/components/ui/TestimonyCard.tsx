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
    <div className='w-xs shadow-main flex min-h-[450px] flex-wrap-reverse items-center justify-center gap-2 rounded-md border-2 border-green-300 bg-green-300/10 px-2 py-4 md:w-[520px] md:flex-nowrap md:px-16 lg:w-[920px]'>
      <div className='flex flex-col gap-2.5 md:gap-6'>
        <Image src={quotesImage} alt="Quotes" width={20} height={14} className='md:min-w-12 w-5' />
        <Typography variant='h3' color='default' size='base' text={`«${title}»`} weight='semibold' />
        <Typography variant='p' color='default' size='sm' text={description} weight='normal' />
        <Typography variant='p' color='default' size='sm' text={author} weight='semibold' className='w-fit border-b border-dotted' />
      </div>
      <div className='flex flex-col items-center gap-1 md:gap-2'>
        <Image src={imageUrl} alt="Testimony" width={244} height={244} className='w-[150px] rounded-full bg-green-300 md:min-w-[244px]' />
        <Typography variant='h3' color='default' size='base' text={name} weight='semibold' />
        <Typography variant='p' color='default' size='sm' text={`${age} años | ${location}`} weight='normal' className='text-neutral-500' />
      </div>
    </div>
  );
};

export default TestimonyCard;
