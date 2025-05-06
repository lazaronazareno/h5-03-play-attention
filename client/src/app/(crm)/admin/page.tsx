import Typography from "@/components/ui/Typography";
import { RefreshCcw } from "lucide-react";

export default function AdminPage() {
  const name = "Nombre y Apellido";
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Typography variant="h2" color="default" size="subtitle" text={"Bienvenido " + name} weight="medium" />
        <div className="ms-auto flex gap-4">
          <button><RefreshCcw /></button>
          <button>Pagina de Inicio de {name}</button>
        </div>
      </div>
    </div>
  );
}