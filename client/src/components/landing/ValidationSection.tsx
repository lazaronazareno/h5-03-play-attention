import Image from "next/image";
import ItemValidation from "../ui/ItemValidation";
import NasaValidationSection from "./NasaValidatedSection";
import Typography from "../ui/Typography";

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
      <div className="h-full flex flex-col items-center lg:flex-row overflow-hidden relative">
        <div className="bg-green-300 absolute z-0 w-full h-full 2xl:h-10/12 bottom-0" />
        <div className='flex flex-col gap-7 lg:gap-12 max-w-[500px] mt-[7%] lg:ms-auto z-10'>
          <Typography
            variant='h2'
            size='subtitle'
            color='white'
            weight='bold'
            text='Clínicamente validado para mejorar:'
            className="text-center"
          />
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 lg:gap-y-10 px-5 lg:px-0">
            {VALIDATION_ITEMS.map((item, index) => (
              <ItemValidation
                key={index}
                name={item}
                className="w-full lg:w-fit"
              />
            ))}
          </div>
        </div>
        <Image
          src='/landing/validationImage.png'
          alt='Validation Image'
          width={1130}
          height={900}
          className="relative min-w-[435px] lg:max-w-[1130px] -bottom-4 lg:left-16 lg:-bottom-9"
        />
      </div>
      <NasaValidationSection />
    </>

  );
};

export default ValidationSection;