import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../globals.css";
import AdminNavbar from "@/components/layout/AdminNavbar";

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
  title: "CRM | Play Attention AR",
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
        <AdminNavbar />
        <main className='py-3 w-full h-full'>{children}</main>
      </body>
    </html>
  );
}
