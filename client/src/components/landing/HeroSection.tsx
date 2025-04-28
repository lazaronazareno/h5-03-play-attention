import React from 'react';
import Button from '../ui/Button';
import { RightArrow } from '../ui/icons';
import HeroImage from '../ui/HeroImage';
import Typography from '../ui/Typography';

const HeroSection = () => {
  return (
    <div className="h-full p-8 lg:p-20 flex flex-col items-center justify-center lg:flex-row gap-16 mx-auto">
      <div className='flex flex-col gap-7 max-w-[560px]'>
        <Typography variant='h1' size='title' color='violet' weight='medium' text='Tecnología que transforma tu mente y potencia tu vida' />
        <Typography variant='p' size='xl' color='default' weight='normal' text='Play Attention es un sistema de neuroentrenamiento para mejorar el desarrollo de habilidades cognitivas que impactan directamente en el rendimiento académico, laboral, deportivo y personal.' />
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