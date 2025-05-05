import { ModalProps } from "@/interfaces/IUserPanel.interfaces";
import { X } from "lucide-react";
import Image from "next/image";

const ItemModal = ({ fileType, fileUrl, isOpen, handleClick }: ModalProps) => {
  const isImage = fileType.startsWith('image/');
  const isWord = fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-green-main/40 ${isOpen ? 'block' : 'hidden'} z-10`}>
      <div className='absolute w-[90%] h-[90%] left-1/2 -translate-x-1/2 top-11 bg-neutral-white2 mx-auto rounded-md flex flex-col text-start p-4'>
        <button title='x' type='button' className='absolute top-0 right-0 m-2 rounded-full border-2 border-violet-main cursor-pointer' onClick={handleClick}>
          <X size={12} strokeWidth={3} className='text-violet-main' />
        </button>
        {isImage ? (
          <Image
            src={fileUrl}
            alt='Imagen'
            width={700}
            height={360}
            className='object-cover rounded-md'
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