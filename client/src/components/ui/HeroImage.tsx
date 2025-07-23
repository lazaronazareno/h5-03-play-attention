import Image from 'next/image';
import React from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
}

const HeroImage = ({ imageUrl, title }: HeroImageProps) => {
  return (
    <div className='relative'>
      <div className="rounded-bl-4xl absolute left-3 top-4 z-0 h-full w-full rounded-tr-[50px] bg-violet-secondary/20 lg:left-8 lg:top-8" />
      <Image
        src={imageUrl}
        alt={title}
        width={710}
        height={490}
        className="lg:border-3 relative z-10 rounded-2xl border-2 border-violet-main object-cover"
      />
    </div>
  );
};

export default HeroImage;
