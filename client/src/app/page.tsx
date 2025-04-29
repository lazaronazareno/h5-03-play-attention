import BenefitsSection from "@/components/landing/BenefitsSection";
import HeroSection from "@/components/landing/HeroSection";
import ValidationSection from "@/components/landing/ValidationSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

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
      <Navbar />
      <HeroSection
        imageUrl={HEROSECTION_PROPS.imageUrl}
        title={HEROSECTION_PROPS.title}
        description={HEROSECTION_PROPS.description}
        button1Text={HEROSECTION_PROPS.button1Text}
        button2Text={HEROSECTION_PROPS.button2Text}
      />
      <ValidationSection />
      <BenefitsSection />
      <ValidationSection />
      <Footer />
    </main>
  );
}
