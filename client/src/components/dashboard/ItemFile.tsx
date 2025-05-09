'use client';
import { CheckIcon, Download, Eye } from 'lucide-react';
import React, { useState } from 'react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import { ItemFileProps } from '@/interfaces/IUserPanel.interfaces';
import Video from '../video/Video';
import ItemModal from './ItemModal';
import DownloadModal from './DownloadModal';
import { FakeTranscription } from '../utils/fakeTranscription';


const ItemFile = ({ title, description, type, icon, fileUrl, fileType, transcription, checkbox, isSelected, setSelectedFile, id }: ItemFileProps) => {
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
            {!checkbox && (
              <>
                {
                  icon
                    ? <span className='mr-1 mt-2 lg:mr-2'>{icon}</span>
                    : <span className='size-5 mt-2 flex items-center justify-center rounded-full bg-green-main'>
                      <CheckIcon size={18} color='white' strokeWidth={3} />
                    </span>
                }
              </>
            )}

            {
              checkbox && (
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={() => setSelectedFile?.(isSelected ? 0 : id!)}
                    className='form-checkbox h-5 w-5 rounded border-gray-300 text-green-main focus:ring-green-main'
                  />
                </div>
              )
            }
            <div className='flex flex-col'>
              <Typography text={title} variant='h3' color='violet' size='small-title' weight='semibold' />
              <Typography text={description} variant='p' color='default' size='sm' weight='normal' />
            </div>
            <div className='ml-auto flex items-center gap-1 lg:gap-2'>
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
                  ? <span className='mr-1 mt-2 lg:mr-2'>{icon}</span>
                  : <span className='size-5 mt-2 flex items-center justify-center rounded-full bg-green-main'>
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
                apiResponse={transcription ?? FakeTranscription}
              />
            </div>
          </div>
        )
      }
    </>
  );
};

export default ItemFile;
