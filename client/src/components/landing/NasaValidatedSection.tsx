import Image from "next/image";
import NasaLogo from "/public/landing/nasaLogo.png";

const NasaValidationSection = () => {
  return (
    <div className="mx-auto h-full w-full max-w-[1470px] py-10 lg:px-4">
      <h2 className="mx-auto text-center font-roboto text-2xl font-medium text-violet-main lg:text-5xl">
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
