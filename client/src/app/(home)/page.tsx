import AboutUsSection from "@/components/landing/AboutUsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HeroSection from "@/components/landing/HeroSection";
import TechologySection from "@/components/landing/TechologySection";
import TestimonySection from "@/components/landing/TestimonySection";
import ValidationSection from "@/components/landing/ValidationSection";

const HEROSECTION_PROPS = {
  imageUrl: "/landing/heroimage.jpg",
  title: "Tecnología que transforma tu mente y potencia tu vida",
  description:
    'Play Attention es un sistema de neuroentrenamiento para mejorar el desarrollo de habilidades cognitivas que impactan directamente en el rendimiento académico, laboral, deportivo y personal.',
  button1Text: "Realizar test de TDAH",
  button2Text: "Reserva tu demostración",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection
        imageUrl={HEROSECTION_PROPS.imageUrl}
        title={HEROSECTION_PROPS.title}
        description={HEROSECTION_PROPS.description}
        button1Text={HEROSECTION_PROPS.button1Text}
        button2Text={HEROSECTION_PROPS.button2Text}
        link1="/tdah"
      />
      <ValidationSection />
      <BenefitsSection />
      <TechologySection />
      <AboutUsSection />
      <TestimonySection
        title="Testimonios de usuarios"
        type="home"
      />
    </main>
  );
}
