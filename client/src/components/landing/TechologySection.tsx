import React from 'react';
import Typography from '../ui/Typography';
import ItemTechnology from '../ui/ItemTechnology';

const TECHNOLOGY_ITEMS = [
  {
    name: 'TDAH',
    image: '/landing/technology/TDAH.png'
  },
  {
    name: 'Transtorno del Aprendizaje',
    image: '/landing/technology/TRASTORNOS_DEL_APRENDIZAJE.png'
  },
  {
    name: 'Transtornos de la Comunicación',
    image: '/landing/technology/TRASTORNOS_DE_LA_COMUNICACION.png'
  },
  {
    name: 'Déficits Cognitivos',
    image: '/landing/technology/DEFICITS_COGNITIVOS.png'
  },
  {
    name: 'Discapacidad Intelectual',
    image: '/landing/technology/DISCAPACIDAD_INTELECTUAL.png'
  },
]

const TechologySection = () => {
  return (
    <div id='technology' className='mx-auto flex w-3/4 flex-col gap-3 py-12 text-center lg:py-28'>
      <Typography variant='p' color='default' size='sm' text='Programa terapéutico personalizado y eficaz' weight='normal' />
      <Typography variant='h2' color='green' size='title' text='Áreas de Intervención' weight='normal' />
      <Typography variant='p' color='default' size='base' text='La tecnología combinada de neurociencia y Play Attention ofrece el mejor método que permite entrenar de forma gradual y sostenible, generando así mejoras significativas en la atención, el control de impulsos y la autorregulación emocional en usuarios de todas las edades.' weight='normal' />
      <div className='flex flex-col items-center justify-between gap-4 pt-4 lg:flex-row lg:pt-12'>
        {TECHNOLOGY_ITEMS.map((item, index) => (
          <ItemTechnology
            key={index}
            name={item.name}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default TechologySection;
