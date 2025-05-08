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
    <div className='flex flex-col items-center bg-white border border-violet-main w-[300px] rounded-md shadow-main p-4 gap-4' onClick={(e) => e.stopPropagation()}>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-main"></div>
          </div>
        </>
      ) : (
        <>
          <div className='flex justify-center items-center size-20 rounded-full bg-violet-main'>
            {type === 'confirm' && (
              <Upload size={40} color='white' />
            )}
            {type === 'delete' && (
              <Trash2 size={40} color='white' />
            )}
          </div>
          <Typography text={type === 'confirm' ? '¿Está seguro de que quiere subir este archivo?' : '¿Está seguro de que quiere eliminar este archivo?'} variant='h3' color='green' size='small-title' weight='semibold' className='text-center' />
          <div className='flex gap-2 h-10'>
            <Button variant='primary' text='Aceptar' onClick={() => handleConfirm()} className='h-full justify-center items-center' />
            <Button variant='secondary' text='Cancelar' onClick={() => setOpenModal(false)} className='h-full justify-center items-center' />
          </div>
          {type === 'confirm' && (
            <div className='flex items-center mt-2'>
              <input type='checkbox' id='notifyUser' className='mr-2' />
              <label htmlFor='notifyUser' className='text-sm text-gray-700'>
                Notificar al usuario
              </label>
            </div>
          )}
        </>
      )}
      {success && (
        <div className='flex justify-center items-center mt-4'>
          <Check size={40} className='text-green-main' />
          <Typography text={type === 'confirm' ? 'Archivo subido correctamente' : 'Archivo eliminado satisfactoriamente'} variant='h3' color='green' size='small-title' weight='semibold' />
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center mt-4'>
          <Typography text='Error al subir el archivo' variant='h3' color='default' size='small-title' weight='semibold' />
        </div>
      )}
    </div>
  );
};

export default ConfirmUploadModal;