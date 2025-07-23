import { Check, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Button from './Button';

interface ResponseModalProps {
  type: "success" | "error";
  title: string
  message: string;
  buttonText?: string;
  onClose: () => void;
  onCLick?: () => void;
}

const ResponseModal = ({ type, message, onClose, title, buttonText, onCLick }: ResponseModalProps) => {
  return (
    <div className="relative flex flex-col gap-2 justify-center items-center text-center bg-white rounded-lg shadow-lg p-6 max-w-sm w-[300px] h-[480px]">
      <div className="absolute top-2 right-2 cursor-pointer border-2 border-violet-main rounded-full size-5">
        <X size={16} strokeWidth={3} className="text-violet-main" onClick={onClose} />
      </div>
      <div className={`rounded-full size-20 mt-auto mb-4 flex justify-center items-center ${type === "success" ? "bg-violet-main" : "bg-red-500"}`}>
        {type === "success" ? <Check size={67} color='white' /> : <X size={67} color='white' />}
      </div>
      <p className={`text-lg font-roboto ${type === "success" ? "text-green-main" : "text-red-500"}`}>{title}</p>
      <p className="font-poppins text-[16px]">{message}</p>
      {buttonText && (
        <Button
          text={buttonText}
          variant="primary"
          className="flex justify-center items-center"
          onClick={onCLick || onClose}
        />
      )}
      <Image
        src='/branding/LogoPlay.png'
        alt='Logo Play Attention'
        width={90}
        height={48}
        className='mt-auto'
      />
    </div>
  );
};

export default ResponseModal;