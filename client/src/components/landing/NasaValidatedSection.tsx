import Image from "next/image";
import NasaLogo from "/public/landing/nasaLogo.png";

const NasaValidationSection = () => {
  return (
    <div className="w-full flex justify-center h-full items-center px-20 lg:px-40 py-10">
      <h2 className="text-2xl lg:text-4xl text-center text-[#1F6AA9] font-medium">Basado en más de 30 años de investigación de la
        <span className="inline-flex items-center">
          <Image src={NasaLogo} alt="Nasa Logo" className="ms-1 w-20 lg:w-28" />
        </span>
        , validación clínica y con más de 50.000 personas con TDAH beneficiadas</h2>
    </div>
  );
};

export default NasaValidationSection;