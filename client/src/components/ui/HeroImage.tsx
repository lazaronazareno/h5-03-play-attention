import Image from 'next/image';
import React from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
}

const HeroImage = ({ imageUrl, title }: HeroImageProps) => {
  return (
    <div className='relative w-[570px] lg:min-w-[820px] h-[423px] lg:h-[608px]'>
      <div className="absolute top-10 lg:top-16 left-8 w-[543px] lg:w-[781px] h-[380px] lg:h-[546px] rounded-tr-[50px] rounded-bl-4xl bg-green-main z-0" />
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={500}
        className="relative z-10 w-[500px] lg:w-[720px] h-[378px] lg:h-[544px] object-cover rounded-2xl border-2 lg:border-3 border-violet-main"
      />
    </div>
  );
};

export default HeroImage;