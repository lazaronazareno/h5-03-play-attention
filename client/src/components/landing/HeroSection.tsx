import React from 'react';
import Button from '../ui/Button';
import { RightArrow } from '../ui/icons';
import HeroImage from '../ui/HeroImage';

const HeroSection = () => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center lg:flex-row gap-16 mx-auto">
      <div className='flex flex-col gap-7 max-w-[560px]'>
        <h1 className="text-4xl text-violet-main font-medium font-roboto">Tecnología que entrena tu atención, transforma tu mente y potencia tu vida</h1>
        <p className="text-xl font-poppins">Play Attention es un sistema de neuroentrenamiento para mejorar el desarrollo de habilidades cognitivas que impactan directamente en el rendimiento académico, laboral, deportivo y personal.</p>
        <Button
          text='Realiza tu TEST de TDAH '
          variant='primary'
          icon={<RightArrow />}
          iconPosition='right'
        />
      </div>
      <HeroImage
        imageUrl='/landing/heroimage.jpg'
        title='Hero Image'
      />
    </div>
  );
};

export default HeroSection;