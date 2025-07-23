import Typography from "@/components/ui/Typography";
import Image from "next/image";
import SymbolLogo from '/public/branding/LogoSymbol.png'
import WelcomeImage from '/public/dashboard/welcome.png'

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between pt-9 lg:flex-row">
      <div className="flex flex-1 flex-col gap-4 px-6 lg:gap-6 lg:px-20 lg:pt-32">
        <div className="flex items-end">
          <Typography text="Bienvenido a Play Attention" variant="h1" color="violet" size="title" weight="medium" className="w-[200px] lg:w-[335px]" />
          <Image src={SymbolLogo} alt="Logo" width={50} height={50} className="-ms-2 mb-2 h-12 w-4 lg:mb-0 lg:h-16 lg:w-7" />
        </div>
        <Typography text="En esta plataforma encontraras todo el material que necesitas para utilizar el servicio y/o producto y obtener de manera satisfactoria todos sus beneficios. " variant="p" color="default" size="base" weight="normal" className="w-4/5" />
      </div>
      <Image src={WelcomeImage} alt="Welcome" width={800} height={1000} className="lg:flex-1" />
    </main>
  );
}
