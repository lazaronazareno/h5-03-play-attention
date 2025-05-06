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
        <div className='min-h-screen w-full flex flex-col md:flex-row'>
          <div className="md:fixed md:w-84 z-20">
            <UserNavbar />
          </div>
          {/* Contenido principal */}
          <div className='flex-1 md:ml-64 mt-16 md:mt-10'>
            <main className='p-6'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
