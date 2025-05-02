import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../../globals.css";
import Link from "next/link";

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

const dashboardRoutes = [
  {
    name: "Inicio",
    url: "/dashboard",
  },
  {
    name: "Videos de Muestra",
    url: "/dashboard/videos",
  },
  {
    name: "Material Educativo",
    url: "/dashboard/educational-material",
  },
  {
    name: "Tutoriales",
    url: "/dashboard/tutorials",
  },
  {
    name: "Artículos Médicos",
    url: "/dashboard/medical-articles",
  },
  {
    name: "Material de Marketing",
    url: "/dashboard/marketing-material",
  },
  {
    name: "Actividades",
    url: "/dashboard/activities",
  },
  {
    name: "Eventos",
    url: "/dashboard/events",
  },
  {
    name: "Configuración",
    url: "/dashboard/config",
  },
  {
    name: "Soporte",
    url: "/dashboard/support",
  },
]

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <header>
          <nav className="flex flex-col md:flex-row justify-between bg-violet-main/20 p-4">
            {dashboardRoutes.map((route) => (
              <Link key={route.name} href={route.url} className="text-violet-main hover:text-violet-dark transition-colors duration-300">
                {route.name}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
