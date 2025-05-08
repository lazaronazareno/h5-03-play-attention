import React from 'react';
import BenefitsItem from '../ui/BenefitsItem';

const BenefitsSection = () => {
  return (
    <div id='benefits' className='flex flex-col gap-4'>
      <BenefitsItem
        title='Play Attention es como un gimnasio para el cerebro.'
        description='El usuario se coloca el brazalete BrainAware™ que detecta su nivel de atención en tiempo real, a través de juegos y ejercicios personalizados.'
        description2='Utilizando el software de Play Attention, el sistema ofrece retroalimentación inmediata que permite desarrollar conciencia, foco, disciplina mental y autorregulación emocional.'
        imageUrl='/landing/benefits/benefits1.png'
        position='left'
        centerImages={false}
      />
      <BenefitsItem
        title='La clave es la repetición: Cuanto más repetimos una habilidad, más fuerte se vuelve.'
        description='Practica solo 10 minutos al día para desarrollar tu capacidad de atención, planificar y completar tareas, mejorar tu memoria y regular tus emociones de forma consciente.'
        imageUrl='/landing/benefits/benefits2.png'
        position='right'
        centerImages={false}
      />
      <BenefitsItem
        title='Haz seguimiento de tu progreso mediante datos y gráficos en tiempo real.'
        description='Los avances pueden observarse en pocas semanas y se adaptan a cualquier edad, necesidad o contexto. Play Attention puede utilizarse desde casa, en consultorios, instituciones educativas o empresas.'
        imageUrl='/landing/benefits/benefits3.png'
        position='left'
        centerImages={false}
      />
    </div>
  );
};

export default BenefitsSection;