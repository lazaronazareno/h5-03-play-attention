import Image from 'next/image';
import React from 'react';
import Typography from './Typography';

interface BenefitsItemProps {
  title: string;
  description: string;
  description2?: string;
  imageUrl: string;
  position: 'left' | 'right';
  className?: string;
  centerImages: boolean;
}

const BenefitsItem = ({ title, description, description2, imageUrl, position, className, centerImages }: BenefitsItemProps) => {
  return (
    <div className={`relative w-full h-full px-6 lg:px-36 flex flex-col lg:flex-row justify-center ${className} ${position === 'left' && 'flex-col-reverse'} bg-violet-secondary/15 ${!centerImages ? 'lg:bg-transparent lg:h-[700px]' : 'py-20 gap-28'}`}>
      {/* background only visible in desktop && !centerImages */}
      {!centerImages && (
        <div className='bg-violet-secondary/15 bottom-0 z-0 hidden h-[550px] w-full lg:absolute lg:block' />
      )}

      {position === 'left' && (
        <div className="z-10 h-full w-full flex-1 pt-2">
          <Image src={imageUrl} alt={title} width={700} height={700} />
        </div>
      )}
      <div className={`flex-1 lg:w-1/2 text-start ${position === 'left' ? 'lg:ms-auto' : 'lg:mr-auto'} flex flex-col items-start justify-center gap-4 ${!centerImages && 'lg:pt-[150px]'} `}>
        <Typography text={title} variant='h2' color='violet' size='subtitle' weight='semibold' className='py-6 text-3xl lg:w-4/5 lg:text-5xl' />
        <Typography text={description} variant='p' color='default' size='base' weight='normal' className="mb-2" />
        {description2 &&
          <Typography text={description2} variant='p' color='default' size='base' weight='normal' className="mb-2" />
        }
      </div>
      {position === 'right' && (
        <div className="z-10 h-full w-full flex-1 pt-2">
          <Image src={imageUrl} alt={title} width={700} height={700} />
        </div>
      )}
    </div>
  );
};

export default BenefitsItem;
