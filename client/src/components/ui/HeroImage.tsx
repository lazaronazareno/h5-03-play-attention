import Image from 'next/image';
import React from 'react';

interface HeroImageProps {
  imageUrl: string;
  title: string;
}

const HeroImage = ({ imageUrl, title }: HeroImageProps) => {
  return (
    <div className='relative'>
      <div className="absolute top-4 lg:top-8 left-3 lg:left-8 w-full h-full rounded-tr-[50px] rounded-bl-4xl bg-violet-secondary/20 z-0" />
      <Image
        src={imageUrl}
        alt={title}
        width={710}
        height={490}
        className="relative z-10 object-cover rounded-2xl border-2 lg:border-3 border-violet-main"
      />
    </div>
  );
};

export default HeroImage;