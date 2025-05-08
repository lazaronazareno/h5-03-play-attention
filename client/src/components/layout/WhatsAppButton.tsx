import Image from "next/image";
import whattsappicon from "/public/icons/whatsapp.png";

type WhatsAppButtonProps = {
  phoneNumber: string;
  message: string;
  size?: number; // opcional, por defecto 16px
};

const WhatsAppButton = ({ phoneNumber, message, size = 16 }: WhatsAppButtonProps) => {

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 ease-in-out hover:rotate-6 hover:scale-110"
      >
        <Image
          src={whattsappicon}
          alt="WhatsApp"
          className="size-16 lg:size-20 object-contain"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;
