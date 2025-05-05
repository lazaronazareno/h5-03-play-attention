import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

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
      </body>
    </html>
  );
}
