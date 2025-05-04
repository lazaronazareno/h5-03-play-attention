'use client';
import { CheckIcon, Download, Eye } from 'lucide-react';
import React, { useState } from 'react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import { ItemFileProps } from '@/interfaces/IUserPanel.interfaces';
import Video from '../video/Video';
import ItemModal from './ItemModal';
import DownloadModal from './DownloadModal';


const ItemFile = ({ title, description, type, icon, fileUrl, fileType, transcription }: ItemFileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  const handleDownloadModal = () => {
    setIsDownloadModalOpen(!isDownloadModalOpen);
  }

  return (
    <>
      {
        (type === 'document' || type === 'image') && (
          <div className='flex w-full gap-1 lg:gap-2'>
            {
              icon
                ? <span className='mr-1 lg:mr-2 mt-2'>{icon}</span>
                : <span className='bg-green-main rounded-full size-5 flex justify-center items-center mt-2'>
                  <CheckIcon size={18} color='white' strokeWidth={3} />
                </span>
            }
            <div className='flex flex-col'>
              <Typography text={title} variant='h3' color='violet' size='small-title' weight='semibold' />
              <Typography text={description} variant='p' color='default' size='sm' weight='normal' />
            </div>
            <div className='flex gap-1 lg:gap-2 ml-auto items-center'>
              <Button
                text='Descargar'
                variant='primary'
                onClick={() => handleDownloadModal()}
                icon={<Download size={16} color='white' strokeWidth={3} />}
                iconPosition='right'
                iconResponsive={true}
              />
              <Button
                text='Avance'
                variant='secondary'
                onClick={() => handleModal()}
                icon={<Eye size={16} strokeWidth={3} className='text-violet-main' />}
                iconPosition='right'
                iconResponsive={true}
              />
            </div>
            <ItemModal
              fileType={fileType}
              fileUrl={fileUrl}
              isOpen={isOpen}
              handleClick={() => handleModal()}
            />
            {isDownloadModalOpen && (
              <DownloadModal
                fileUrl={fileUrl}
                isOpen={isDownloadModalOpen}
                handleClick={() => handleDownloadModal()}
                title={title}
                fileType={fileType}
              />
            )}
          </div>
        )
      }
      {
        type === 'video' && (
          <div className='relative cursor-pointer' onClick={() => setIsVideoOpen(!isVideoOpen)}>
            <div className='flex w-full gap-1 lg:gap-2'>
              {
                icon
                  ? <span className='mr-1 lg:mr-2 mt-2'>{icon}</span>
                  : <span className='bg-green-main rounded-full size-5 flex justify-center items-center mt-2'>
                    <CheckIcon size={18} color='white' strokeWidth={3} />
                  </span>
              }
              <div className='flex flex-col'>
                <Typography text={title} variant='h3' color='violet' size='small-title' weight='semibold' />
                <Typography text={description} variant='p' color='default' size='sm' weight='normal' />
              </div>
            </div>
            <div className={`flex justify-self-center w-full lg:w-2/3 mt-2 rounded-md overflow-hidden ${isVideoOpen ? 'h-full border border-violet-main' : 'hidden'} transition-all`}
              onClick={(e) => e.stopPropagation()}
            >
              <Video
                name={title}
                description={description}
                url={fileUrl}
                apiResponse={transcription!}
              />
            </div>
          </div>
        )
      }
    </>
  );
};

export default ItemFile;