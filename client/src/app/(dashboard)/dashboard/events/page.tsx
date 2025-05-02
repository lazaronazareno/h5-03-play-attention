import UserPanel from "@/components/dashboard/UserPanel";

export default function EventsPage() {
  return (
    <UserPanel
      title="Eventos"
      description="Aquí visualizaras un candelario con los eventos, entrenamientos, webinars, etc."
      imageUrl="/dashboard/eventos.png"
      items={[]}
    />
  );
}