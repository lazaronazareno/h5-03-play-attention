import ItemFile from '@/components/dashboard/ItemFile';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { Trash2, Upload } from 'lucide-react';
import React from 'react';
import UploadFileModal from './UploadFileModal';
import { IContent, IContentType } from '@/interfaces/IAdmin.interfaces';
import ConfirmUploadModal from './ConfirmUploadModal';
import { getActivityType, getFileType } from '@/components/utils/crmUtils';


interface GenericSectionProps<T> {
  title: string;
  icon: React.ReactNode;
  type: IContentType;
  fetchItems: () => Promise<T[]>;
  deleteItemById: (id: number) => Promise<{ status: number } & T>;
}

const UserActivitiesSection = <T,>({ title, icon, type, fetchItems, deleteItemById }: GenericSectionProps<T>) => {
  const [selectedFile, setSelectedFile] = React.useState<number | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [items, setItems] = React.useState<IContent[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteItemById(selectedFile as number) as { status: number };
      if (response.status !== 200) {
        throw new Error('Error deleting file');
      }
      setItems((prevActivities) => prevActivities.filter((activity) => activity.id !== selectedFile));
      setSuccess(true);
    } catch (err) {
      console.error('Error deleting file:', err);
      setError(true);
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetchItems();
      setItems(response as IContent[]);
    };
    fetchData();
  }, [isUploading, isDeleting]);

  console.log(items)

  return (
    <div className='bg-neutral-white2 px-4 py-6 rounded-md shadow-main'>
      <div className='flex justify-center items-center gap-2 pb-4 border-b border-violet-main'>
        {icon}
        <Typography variant='h2' text={title} weight='bold' size='small-title' color='violet' />
        <div className='flex gap-2 ms-auto'>
          {/* <Button variant='primary' text='Seleccionar archivo' icon={<ChevronDown size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' /> */}
          {(selectedFile || selectedFile !== 0) && (
            <Button variant='secondary' text='Eliminar' icon={<Trash2 size={20} className='text-violet-main' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setIsDeleting(true)} />
          )}
          <Button variant='primary' text='Subir' icon={<Upload size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setIsUploading(true)} />
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4 h-full'>
        {items.map((item) => (
          <div key={item.id} className='bg-white shadow-main border-2 border-green-main rounded-md p-2 lg:px-3 lg:py-2.5'>
            <ItemFile
              title={item.title}
              description={item.description}
              type={getActivityType(item.contentType)}
              fileUrl={item.filePath}
              fileType={getFileType(item.filePath)}
              checkbox
              isSelected={selectedFile === item.id}
              setSelectedFile={setSelectedFile}
              id={item.id}
            />
          </div>
        ))}
        {items.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full'>
            <Typography text='No hay archivos disponibles' variant='p' color='default' size='sm' weight='normal' className='text-center' />
          </div>
        )}

      </div>
      {isUploading && (
        <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center' onClick={() => setIsUploading(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <UploadFileModal type={type} setIsUploading={setIsUploading} />
          </div>
        </div>
      )}
      {isDeleting && (
        <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center' onClick={() => setIsDeleting(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ConfirmUploadModal
              type='delete'
              loading={loading}
              setConfirmModal={() => { }}
              setDeleteModal={() => handleDelete()}
              success={success}
              error={error}
              setOpenModal={() => setIsDeleting(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserActivitiesSection;