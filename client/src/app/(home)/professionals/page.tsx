import HeroSection from "@/components/landing/HeroSection";
import ImpactSection from "@/components/landing/ImpactSection";
import TestimonySection from "@/components/landing/TestimonySection";
import BenefitsItem from "@/components/ui/BenefitsItem";
import Typography from "@/components/ui/Typography";

const HEROSECTION_PROPS = {
  imageUrl: "/landing/professionals/hero1.png",
  title: "LLEVA TU PRÁCTICA PROFESIONAL AL SIGUIENTE NIVEL",
  description:
    'Pensado para pacientes que enfrentan desafíos como dificultad atencional, problemas de autorregulación, impulsividad, baja motivación o barreras en el aprendizaje. Una solución innovadora y versátil utilizada por terapeutas, centros educativos y de salud.',
  button1Text: "Reserva tu demostración",
  button1Link: '/tdah',
}

const IMPACTSECTION_PROPS = {
  title: 'Eleva el impacto de tu intervención en casos de TDAH',
  description: 'Transforma la experiencia de tus pacientes con un enfoque innovador que va más allá de lo convencional.',
  imageUrl: '/landing/professionals/pro1.png',
  imageUrl2: '/landing/professionals/pro2.png',
  listItems: [
    {
      title: 'Planes personalizados',
      description: 'Adapta los entrenamientos  a las necesidades específicas de tu cliente.'
    },
    {
      title: 'Monitoreo y optimización',
      description: 'Seguimiento del progreso y ajusta los entrenamientos para maximizar los resultados.'
    },
    {
      title: 'implementación versátil',
      description: 'Compatible con distintos enfoques metodológicos, ya sea de forma presencial o remota.'
    },
    {
      title: '100% Libre de drogas',
      description: 'Adapta los entrenamientos  a las necesidades específicas de tu cliente.'
    }
  ]
}

const BENEFITSSECTION_ITEMS = [
  {
    title: 'Evalúa las necesidades específicas de tu paciente',
    description: 'Hemos creado herramientas para identificar perfiles de estudiantes y construir un plan de entrenamiento individualizado en Play Attention.',
    imageUrl: '/landing/professionals/benef-pro-1.png',
    position: 'right',
    centerImages: false,
  },
  {
    title: 'Configurar un programa de entrenamiento de acuerdo al paciente',
    description: 'Una vez que ingresas el plan en Play Attention, nuestro algoritmo "Sheer Genius™" crea un régimen de entrenamiento diario para tu paciente.',
    imageUrl: '/landing/professionals/benef-pro-2.png',
    position: 'left',
    centerImages: false,
  },
  {
    title: 'Analiza el progreso y optimiza los resultados.',
    description: 'Tus pacientes usan Play Attention de forma remota o presencial en la consulta, y ejecutan el plan individualizado para desarrollar funciones ejecutivas específicas. Monitorea su progreso y ajusta Play Attention para maximizar los resultados.',
    imageUrl: '/landing/professionals/benef-pro-3.png',
    position: 'right',
    centerImages: false,
  },
]

export default function ProfessionalsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection
        imageUrl={HEROSECTION_PROPS.imageUrl}
        title={HEROSECTION_PROPS.title}
        description={HEROSECTION_PROPS.description}
        button1Text={HEROSECTION_PROPS.button1Text}
        link1={HEROSECTION_PROPS.button1Link}
      />
      <ImpactSection
        title={IMPACTSECTION_PROPS.title}
        description={IMPACTSECTION_PROPS.description}
        titlePosition={"up"}
        imageUrl={IMPACTSECTION_PROPS.imageUrl}
        imageUrl2={IMPACTSECTION_PROPS.imageUrl2}
        imagesPosition={"left"}
        color={"green"}
        type={"list"}
        listItems={IMPACTSECTION_PROPS.listItems}
      />
      <Typography variant="h2" size="subtitle" color="violet" weight="medium" text="Clínicamente comprobado: mejora significativa en funciones ejecutivas y regulación conductual versus apps de entrenamiento cerebral." className="mx-auto p-8 text-center lg:py-12" />
      <div id="benefits" className='flex flex-col gap-4'>
        {BENEFITSSECTION_ITEMS.map((item, index) => (
          <BenefitsItem
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            position={item.position as 'left' | 'right'}
            centerImages={true}
          />
        ))}
      </div>

      <TestimonySection
        title="Testimonios de usuarios"
        type="professionals"
      />
    </main>
  );
}
