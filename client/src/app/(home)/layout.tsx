import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '600', '700',],
  variable: '--font-roboto',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700',],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Play Attention AR",
  description: "Developed by NoCountry",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton phoneNumber="1112341234" message="Quiero contactarme con Play Attention" size={60} />
      </body>
    </html>
  );
}
