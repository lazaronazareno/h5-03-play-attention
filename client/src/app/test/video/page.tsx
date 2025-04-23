import Video from "@/components/video/Video";
import YoutubeVideoPlayer from "@/components/video/YoutubeVideoPlayer";

const VIDEOPROPS = {
  name: "Video de prueba",
  description: "Este es un video de prueba",
  url: "https://res.cloudinary.com/db395v0wf/video/upload/v1723270627/samples/dance-2.mp4",
  languagues: ["es", "en"],
  subs: [
    "/subs-esp.vtt",
    "/subs-eng.vtt",
  ],
};

export default function VideoPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Test de los videos</h1>
      <span>EL video de aca se reproduce correctamente, siempre y cuando sea de cloudinary o s3 va a funcionar</span>
      <Video
        name={VIDEOPROPS.name}
        description={VIDEOPROPS.description}
        url={VIDEOPROPS.url}
        languagues={VIDEOPROPS.languagues}
        subs={VIDEOPROPS.subs}
      />
      <span>Como en la historia de usuario decia que el video se debia reproducir de youtube o algun servicio parecido, estuve haciendo pruebas con distintos componentes para hacer andar con subs personalizados, y esto fue lo mejor que pude hacer.</span>
      <span>A este tambien se le pueden agregar botones arriba para controlar su funcionamiento, pero se sigue viendo feo por que es un video directamente enlazado de youtube</span>
      <span>Lo bueno es que tiene funciones para parsear el subtitulo que viene en formato .vtt para sincronizarlo bien en el video, asi que tambien se podria hacer con otros formatos.</span>
      <YoutubeVideoPlayer
        url="https://www.youtube.com/watch?v=1QQBB3cwNM0"
        vttUrl={VIDEOPROPS.subs[0]}
      />
    </main>
  );
}
