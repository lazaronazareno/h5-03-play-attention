import { Download, X } from "lucide-react";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import Image from "next/image";
import { ModalProps } from "@/interfaces/IUserPanel.interfaces";

const DownloadModal = ({ fileUrl, isOpen, handleClick, title }: ModalProps) => {
  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-green-main/40 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='absolute w-[300px] h-[480px] left-1/2 -translate-x-1/2 top-11 bg-neutral-white2 mx-auto rounded-md flex flex-col text-start p-4 border-2 border-violet-main'>
        <button title='x' type='button' className='absolute top-0 right-0 m-2 rounded-full border-2 border-violet-main cursor-pointer' onClick={handleClick}>
          <X size={12} strokeWidth={3} className='text-violet-main' />
        </button>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='size-32 mb-4 mt-16 flex items-center justify-center rounded-full bg-violet-main'>
            <Download size={64} color='white' strokeWidth={2} />
          </div>
          <Typography text='DESCARGAR ARCHIVO' variant='h3' color='green' size='small-title' weight='semibold' className='mb-4' />
          <Typography text='¿Desea descargar el archivo en su dispositivo?' variant='p' color='default' size='sm' weight='normal' className='mb-4 text-center' />
          <div className='flex gap-2 h-8'>
            <Button
              text='Aceptar'
              variant='primary'
              onClick={() => {
                const link = document.createElement('a');
                link.target = '_blank';
                link.href = fileUrl;
                link.setAttribute('download', title || 'Documento de Play Attention');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className='flex-1 !py-0 font-semibold'
            />
            <Button
              text='Cancelar'
              variant='secondary'
              onClick={handleClick}
              className='flex-1 !py-0 font-semibold'
            />
          </div>
          <Image
            src='/branding/LogoPlay.png'
            alt='Logo Play Attention'
            width={90}
            height={48}
            className='mt-auto'
          />
        </div>
      </div>
    </div>
  )
}

export default DownloadModal;