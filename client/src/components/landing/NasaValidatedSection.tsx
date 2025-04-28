import Image from "next/image";
import NasaLogo from "/public/landing/nasaLogo.png";

const NasaValidationSection = () => {
  return (
    <div className="w-full max-w-[1470px] mx-auto h-full lg:px-4 py-10">
      <h2 className="mx-auto text-2xl lg:text-5xl text-center text-violet-main font-medium font-roboto">
        Basado en más de 30 años de investigación de la
        <span className="inline-flex items-center">
          <Image src={NasaLogo} alt="Nasa Logo" className="ms-1 w-20 lg:w-32" />
        </span>
        , validación clínica y con más de 50.000 personas con TDAH beneficiadas
      </h2>
    </div>
  );
};

export default NasaValidationSection;