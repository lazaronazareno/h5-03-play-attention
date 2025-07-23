import React from 'react';
import Typography from '../ui/Typography';
import ImageCard from '../ui/ImageCard';

const ABOUT_US_DATA = [
  {
    imageUrl: '/about/lourdes.png',
    name: 'Lourdes Mazzola',
    degree: 'Lic. en Psicología',
    description: 'Terapeura en Neurofeedback.',
  },
  {
    imageUrl: '/about/marcela.png',
    name: 'Marcela Alegre',
    degree: 'Lic. en Psicopedagogía',
    job: 'Neuropsicóloga',
    description: 'Terapeuta en Neurofeedback.',
  },
]

const AboutUsSection = () => {
  return (
    <div id='aboutus' className='bg-violet-secondary/15 flex flex-col items-center gap-x-40 px-9 py-20 lg:flex-row lg:px-40'>
      <div className='flex flex-1 flex-col gap-4'>
        <Typography variant='h2' color='violet' size='title' text='Sobre nosotras' weight='medium' />
        <Typography variant='p' color='default' size='base' text='Con más de 25 años de experiencia conformamos un equipo Interdisciplinario comprometidos a buscar siempre la mejor solución para cada persona.' weight='normal' />
        <Typography variant='p' color='default' size='base' text='En el año 2020 abrimos la Clínica Neuropsicológica: Dislexia y Conducta, en donde trabajamos con el sistema de aprendizaje “Neurofeedback” que permite mejorar la atención, el comportamiento y la función cognitiva de niños, adolescentes, adultos y adultos mayores.' weight='normal' />
      </div>
      <div className='flex flex-1 justify-center gap-2 pt-4 lg:gap-7'>
        {ABOUT_US_DATA.map((item, index) => (
          <ImageCard
            key={index}
            imageUrl={item.imageUrl}
            name={item.name}
            degree={item.degree}
            job={item.job}
            description={item.description}
            position={index === 0 ? "down" : "up"}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUsSection;
