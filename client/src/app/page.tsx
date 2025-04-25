import HeroSection from "@/components/landing/HeroSection";
import ValidationSection from "@/components/landing/ValidationSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <ValidationSection />
    </main>
  );
}
