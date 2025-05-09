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
    <div className='shadow-main rounded-md bg-neutral-white2 px-4 py-6'>
      <div className='flex items-center justify-center gap-2 border-b border-violet-main pb-4'>
        {icon}
        <Typography variant='h2' text={title} weight='bold' size='small-title' color='violet' />
        <div className='ms-auto flex gap-2'>
          {/* <Button variant='primary' text='Seleccionar archivo' icon={<ChevronDown size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' /> */}
          {selectedFile && selectedFile !== 0 && (
            <Button variant='secondary' text='Eliminar' icon={<Trash2 size={20} className='text-violet-main' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setIsDeleting(true)} />
          )}
          <Button variant='primary' text='Subir' icon={<Upload size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setIsUploading(true)} />
        </div>
      </div>
      <div className='mt-4 flex h-full flex-col gap-4'>
        {items.map((item) => (
          <div key={item.id} className='shadow-main rounded-md border-2 border-green-main bg-white p-2 lg:px-3 lg:py-2.5'>
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
          <div className='flex h-full flex-col items-center justify-center'>
            <Typography text='No hay archivos disponibles' variant='p' color='default' size='sm' weight='normal' className='text-center' />
          </div>
        )}

      </div>
      {isUploading && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/50' onClick={() => setIsUploading(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <UploadFileModal type={type} setIsUploading={setIsUploading} />
          </div>
        </div>
      )}
      {isDeleting && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/50' onClick={() => setIsDeleting(false)}>
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
