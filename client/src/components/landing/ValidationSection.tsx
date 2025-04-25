import Image from "next/image";
import ItemValidation from "../ui/ItemValidation";
import NasaValidationSection from "./NasaValidatedSection";

const VALIDATION_ITEMS = [
  "Función ejecutiva",
  'Comportamiento',
  "Confianza en uno mismo",
  "Atención",
  "Control de impulsos",
  "Organización",
  "Regulación emocional",
]

const ValidationSection = () => {
  return (
    <>
      <div className="h-full flex flex-col items-center lg:flex-row bg-green-300 overflow-hidden">
        <div className='flex flex-col gap-7 lg:min-w-[620px] max-w-[560px] lg:max-w-full pt-12 lg:ps-32'>
          <h2 className="text-4xl lg:text-5xl uppercase lg:normal-case text-white text-center font-bold font-roboto">Clínicamente validado para mejorar:</h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-10">
            {VALIDATION_ITEMS.map((item, index) => (
              <ItemValidation
                key={index}
                name={item}
              />
            ))}
          </div>
        </div>
        <Image
          src='/landing/validationImage.png'
          alt='Validation Image'
          width={1000}
          height={1000}
          className="w-full max-w-[1050px] relative left-9 -bottom-5 lg:left-16 lg:-bottom-9"
        />
      </div>
      <NasaValidationSection />
    </>

  );
};

export default ValidationSection;