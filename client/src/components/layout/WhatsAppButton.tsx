import Image from "next/image";
import whattsappicon from "../../../public/icons/whatsapp-icon-logo-svgrepo-com.svg";

type WhatsAppButtonProps = {
  phoneNumber: string;
  message: string;
  size?: number; // opcional, por defecto 16px
};

const WhatsAppButton =  ({phoneNumber,  message,  size = 16}:WhatsAppButtonProps) => {

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <a 
        href={`https://wa.me/${phoneNumber}?text=${message}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-6"
      >
        <Image
          src={ whattsappicon}
          alt="WhatsApp"
          className="object-contain"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;