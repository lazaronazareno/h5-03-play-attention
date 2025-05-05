import Image from 'next/image';
import React from 'react';

interface ImageDoubleProps {
  imageUrl1: string;
  imageUrl2: string;
  color: 'violet' | 'green';
}

const ImageDouble = ({ imageUrl1, imageUrl2, color }: ImageDoubleProps) => {
  return (
    <div className='relative w-[330px] h-[270px] lg:w-[800px] lg:h-[650px]'>
      <div className={`${color === "violet" && "bg-violet-main"} ${color === "green" && "bg-green-main"} w-[280px] h-[210px] lg:w-[670px] lg:h-[498px] rounded-2xl absolute top-1/2 left-1/2 -translate-1/2`} />
      <Image
        src={imageUrl1}
        alt='Image 1'
        width={550}
        height={350}
        className={`border-2 ${color === "violet" && "border-violet-main"} ${color === "green" && "border-green-main"} w-[230px] h-[145px] lg:w-[550px] lg:h-[350px] absolute top-0 left-0 object-cover rounded-2xl`}
      />
      <Image
        src={imageUrl2}
        alt='Image 2'
        width={550}
        height={350}
        className={`border-2 ${color === "violet" && "border-violet-main"} ${color === "green" && "border-green-main"} w-[230px] h-[145px] lg:w-[550px] lg:h-[350px] absolute bottom-0 right-0 object-cover rounded-2xl`}
      />
    </div>
  );
};

export default ImageDouble;