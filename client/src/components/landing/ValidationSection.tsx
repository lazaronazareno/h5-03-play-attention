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
      <div className="relative flex h-full flex-col items-center overflow-hidden lg:flex-row">
        <div className="2xl:h-10/12 absolute bottom-0 z-0 h-full w-full bg-green-300" />
        <div className='z-10 mt-[7%] flex max-w-[500px] flex-col gap-7 lg:ms-auto lg:gap-12'>
          <Typography
            variant='h2'
            size='subtitle'
            color='white'
            weight='bold'
            text='Clínicamente validado para mejorar:'
            className="text-center"
          />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-5 lg:justify-start lg:gap-y-10 lg:px-0">
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
          className="relative -bottom-4 min-w-[435px] lg:-bottom-9 lg:left-16 lg:max-w-[1130px]"
        />
      </div>
      <NasaValidationSection />
    </>

  );
};

export default ValidationSection;
