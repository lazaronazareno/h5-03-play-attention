import React from 'react';
import { TestimonyCardProps } from '../ui/TestimonyCard';
import Typography from '../ui/Typography';
import Slider from '../slider/Slider';

interface TestimonySectionProps {
  title: string;
  type: 'home' | 'professionals' | 'enterprise' | 'people';
}

const TESTIMONIES: Record<'home' | 'professionals' | 'enterprise' | 'people', TestimonyCardProps[]> = {
  home: [
    {
      title: "A Sophia le gusta la retroalimentación inmediata y se siente muy orgullosa de obtener una muy buena calificación",
      description: " Los profesores han notado que está más concentrada y se mantiene concentrada en la tarea. Recientemente, su profesora comentó que fue la única de su clase que levantó la mano y respondió correctamente a la pregunta después de leer un capítulo. Esto la hizo muy feliz.",
      author: "Madre de niña con TDAH",
      age: 10,
      location: "Córdoba",
      name: "Sophia",
      imageUrl: "/landing/testimonies/2.png",
    },
    {
      title: "Después de usar Play Attention, mi hijo puede concentrarse en las tareas por más tiempo.",
      description: "Sus calificaciones han mejorado. Su maestra me acaba de decir que puede colaborar y tener amigos. Juega con ellos, lo cual me sorprendió mucho. Nunca le había gustado jugar con otros. También es mucho más feliz que antes. En general, ha mejorado mucho.",
      author: "Madre de un niño con TDAH",
      age: 8,
      location: "Mendoza",
      name: "Benjamín",
      imageUrl: "/landing/testimonies/1.png",
    },
    {
      title: "Play Attention ha superado mis expectativas",
      description: "Después de usar Play Attention durante un par de meses, noté mejoras notables en mi energía y en el tiempo que podía concentrarme. En el trabajo, ahora puedo ignorar ruidos de fondo como música o voces fuertes y concentrarme en mis clientes. Y puedo mantener ese nivel de concentración durante mucho más tiempo. Además, estoy matriculado en la universidad para obtener una licenciatura que había perdido la esperanza de obtener.",
      author: "Adulto con Dislexia",
      age: 19,
      location: "Buenos Aires",
      name: "Pablo",
      imageUrl: "/landing/testimonies/3.png",
    },
  ],
  professionals: [
    {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    },
    {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    }, {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    },
  ],
  enterprise: [
    {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    }, {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    }, {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    },
  ],
  people: [
    {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    }, {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    }, {
      title: "A mis pacientes les encanta el refuerzo positivo, las métricas precisas y la calidad de la atención personalizada",
      description: "John ha aprovechado Play Attention con sus pacientes, integrando su estructura y consistencia con motivadores clave como la conexión y la diversión.",
      author: "Entrenador y especialista en autismo certificado",
      age: 40,
      location: "Buenos Aires",
      name: "Federico",
      imageUrl: "/landing/testimonies/1.png",
    },
  ],
};

const TestimonySection = ({ title, type }: TestimonySectionProps) => {
  return (
    <div className='flex flex-col items-center py-10 md:py-20'>
      <Typography variant='h2' color='green' size='title' text={title} weight='semibold' className='text-center mb-8' />
      <div className='flex gap-4 w-full'>
        <Slider
          items={TESTIMONIES[type]}
        />
      </div>
    </div>
  );
};

export default TestimonySection;