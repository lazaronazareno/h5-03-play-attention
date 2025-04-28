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
}

const BenefitsItem = ({ title, description, description2, imageUrl, position, className }: BenefitsItemProps) => {
  return (
    <div className={`relative w-full lg:h-[700px] h-full px-6 lg:px-36 flex flex-col lg:flex-row justify-center ${className} ${position === 'left' && 'flex-col-reverse'} bg-violet-secondary/15 lg:bg-transparent`}>
      {/* background only visible in desktop */}
      <div className='bg-violet-secondary/15 h-[550px] hidden lg:block lg:absolute bottom-0 w-full z-0 ' />

      {position === 'left' && (
        <div className="flex-1 h-full z-10">
          <Image src={imageUrl} alt={title} width={700} height={700} />
        </div>
      )}
      <div className={`flex-1 lg:w-1/2 text-start ${position === 'left' ? 'lg:ms-auto' : 'lg:mr-auto'} flex flex-col items-start justify-center gap-4 lg:pt-[150px]`}>
        <Typography text={title} variant='h2' color='violet' size='subtitle' weight='semibold' className='text-3xl lg:text-5xl lg:w-4/5 py-6' />
        <Typography text={description} variant='p' color='default' size='base' weight='normal' className="mb-2" />
        {description2 &&
          <Typography text={description2} variant='p' color='default' size='base' weight='normal' className="mb-2" />
        }
      </div>
      {position === 'right' && (
        <div className="flex-1 h-full z-10">
          <Image src={imageUrl} alt={title} width={700} height={700} />
        </div>
      )}
    </div>
  );
};

export default BenefitsItem;