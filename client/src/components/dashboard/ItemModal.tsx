import { ModalProps } from "@/interfaces/IUserPanel.interfaces";
import { X } from "lucide-react";
import Image from "next/image";

const ItemModal = ({ fileType, fileUrl, isOpen, handleClick }: ModalProps) => {
  const isImage = fileType.startsWith('image/');
  const isWord = fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-green-main/40 ${isOpen ? 'block' : 'hidden'} z-10`}>
      <div className='absolute left-1/2 top-11 mx-auto flex h-[90%] w-[90%] -translate-x-1/2 flex-col rounded-md bg-neutral-white2 p-4 text-start'>
        <button title='x' type='button' className='absolute right-0 top-0 m-2 cursor-pointer rounded-full border-2 border-violet-main' onClick={handleClick}>
          <X size={12} strokeWidth={3} className='text-violet-main' />
        </button>
        {isImage ? (
          <Image
            src={fileUrl}
            alt='Imagen'
            width={700}
            height={360}
            className='rounded-md object-cover'
          />
        ) : isWord ? (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Word Document Viewer"
          />
        ) : (
          <embed
            style={{ width: '100%', height: '100%', marginTop: '8px' }}
            type={fileType}
            src={fileUrl}
          />
        )}
      </div>
    </div>
  )
}
export default ItemModal;
