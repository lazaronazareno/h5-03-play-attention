import HeroSection from "@/components/landing/HeroSection";
import ValidationSection from "@/components/landing/ValidationSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <HeroSection />
      <ValidationSection />
      <Footer />
    </main>
  );
}
