import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { Check, Trash2, Upload } from 'lucide-react';
import React from 'react';

interface ConfirmUploadModalProps {
  type: 'confirm' | 'delete';
  setConfirmModal: (isOpen: boolean) => void;
  setDeleteModal: (isOpen: boolean) => void;
  loading: boolean;
  success: boolean;
  error?: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

const ConfirmUploadModal = ({ type, loading, setConfirmModal, setDeleteModal, success, error, setOpenModal }: ConfirmUploadModalProps) => {
  const handleConfirm = () => {
    if (type === 'confirm') {
      setConfirmModal(true);
    } else if (type === 'delete') {
      setDeleteModal(true);
    }
  }

  return (
    <div className='shadow-main flex w-[300px] flex-col items-center gap-4 rounded-md border border-violet-main bg-white p-4' onClick={(e) => e.stopPropagation()}>
      {loading ? (
        <>
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-violet-main"></div>
          </div>
        </>
      ) : (
        <>
          <div className='size-20 flex items-center justify-center rounded-full bg-violet-main'>
            {type === 'confirm' && (
              <Upload size={40} color='white' />
            )}
            {type === 'delete' && (
              <Trash2 size={40} color='white' />
            )}
          </div>
          <Typography text={type === 'confirm' ? '¿Está seguro de que quiere subir este archivo?' : '¿Está seguro de que quiere eliminar este archivo?'} variant='h3' color='green' size='small-title' weight='semibold' className='text-center' />
          <div className='flex h-10 gap-2'>
            <Button variant='primary' text='Aceptar' onClick={() => handleConfirm()} className='h-full items-center justify-center' />
            <Button variant='secondary' text='Cancelar' onClick={() => setOpenModal(false)} className='h-full items-center justify-center' />
          </div>
          {type === 'confirm' && (
            <div className='mt-2 flex items-center'>
              <input type='checkbox' id='notifyUser' className='mr-2' />
              <label htmlFor='notifyUser' className='text-sm text-gray-700'>
                Notificar al usuario
              </label>
            </div>
          )}
        </>
      )}
      {success && (
        <div className='mt-4 flex items-center justify-center'>
          <Check size={40} className='text-green-main' />
          <Typography text={type === 'confirm' ? 'Archivo subido correctamente' : 'Archivo eliminado satisfactoriamente'} variant='h3' color='green' size='small-title' weight='semibold' />
        </div>
      )}
      {error && (
        <div className='mt-4 flex items-center justify-center'>
          <Typography text='Error al subir el archivo' variant='h3' color='default' size='small-title' weight='semibold' />
        </div>
      )}
    </div>
  );
};

export default ConfirmUploadModal;
