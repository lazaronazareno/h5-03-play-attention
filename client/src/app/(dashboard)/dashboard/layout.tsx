import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../../globals.css";
import UserNavbar from "@/components/layout/UserNavbar";

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


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <div className='flex min-h-screen w-full flex-col md:flex-row'>
          <div className="md:w-84 z-20 md:fixed">
            <UserNavbar />
          </div>
          {/* Contenido principal */}
          <div className='mt-16 flex-1 md:ml-64 md:mt-10'>
            <main className='p-6'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
