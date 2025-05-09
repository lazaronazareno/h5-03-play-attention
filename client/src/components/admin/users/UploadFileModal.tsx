'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/inputs/Input';
import Button from '@/components/ui/Button';
import DropdownLead from '@/components/ui/DropdownLead';
import Typography from '@/components/ui/Typography';
import { ContentCategoriesNames } from '@/constants/LeadNaming';
import { ChevronRight, FileText, Image, Link2, Upload, Youtube } from 'lucide-react';
import { IContent, IContentCategory, IContentType } from '@/interfaces/IAdmin.interfaces';
import { uploadContent } from '@/services/admin/uploadContent';
import ConfirmUploadModal from './ConfirmUploadModal';

const uploadFileSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().optional(),
  category: z.string().min(1, 'La categoría es obligatoria'),
  file: z.instanceof(File).optional(),
  notifyUser: z.boolean(),
  fileUrl: z.string().url('La URL del archivo debe ser válida').optional(),
});

type UploadFileFormData = z.infer<typeof uploadFileSchema>;

interface UploadFileModalProps {
  type: IContentType;
  setIsUploading: (isUploading: boolean) => void;
}

const UploadFileModal = ({ type, setIsUploading }: UploadFileModalProps) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<UploadFileFormData>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      file: undefined,
      notifyUser: false,
      fileUrl: '',
    },
  });
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [urlFilePath, setUrlFilePath] = React.useState('');

  const onSubmit = async (data: UploadFileFormData) => {
    setLoading(true);
    const categoryKey = Object.keys(ContentCategoriesNames).find(
      (key) => ContentCategoriesNames[key as keyof typeof ContentCategoriesNames] === data.category
    );

    const getFilePathByType = (type: IContentType) => {
      switch (type) {
        case "ARTICLE":
          return 'https://res.cloudinary.com/db395v0wf/raw/upload/v1746326741/k28ddoily3xmxodulvac.docx';
        case "DOCUMENT":
        case "ACTIVITY":
          return 'https://res.cloudinary.com/db395v0wf/image/upload/v1746652896/ges79ykvq8jpvu6m9cc8.pdf';
        case "VIDEO":
        case "TUTORIAL":
          return 'https://res.cloudinary.com/db395v0wf/video/upload/v1746336117/bxj3o9kptqfawaa84dnp.mp4';
        case "IMAGE":
        case "MARKETING":
          return 'https://res.cloudinary.com/db395v0wf/image/upload/v1746342963/kboacolxygcs9rqi7xjs.png';
        case "EVENT":
        default:
          return ""
      }
    }

    const currentContent: IContent = {
      id: 0,
      title: data.title,
      description: data.description || 'Descripción del archivo',
      filePath: urlFilePath ?? getFilePathByType(type),
      thumbnailPath: '',
      contentType: type,
      category: categoryKey as IContentCategory,
      active: true,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      createdBy: 1,
      languageCode: 'es',
      originalContentId: 0,
    };

    console.log('Contenido generado:', currentContent);
    try {
      const response = await uploadContent(currentContent);
      console.log('Respuesta de la API:', response);
      setSuccess(true);
      setError(false);

    } catch (err) {
      console.error('Error al subir el contenido:', err);
      setSuccess(false);
      setError(true);
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    setConfirmModal(true);
  };

  return (
    <div className="shadow-main flex w-[700px] flex-col rounded-md border border-violet-main bg-white p-4">
      <Typography text="Subir archivo" variant="p" color="violet" size="small-title" weight="semibold" className="mb-4" />
      <form onSubmit={handleSubmit(handleConfirm)} className="flex flex-col gap-4">
        <div className="mb-4 flex items-center gap-2">
          <Typography variant="p" text="Título" weight="semibold" size="sm" color="default" className="w-32" />
          <div className="w-full">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Título" />
              )}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Typography variant="p" text="Descripción" weight="semibold" size="sm" color="default" />
          <div className="w-full">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Descripción (Opcional)" />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="p" text="Categoría" weight="semibold" size="sm" color="default" className="w-28" />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <DropdownLead
                {...field}
                title="Tipo de archivo"
                options={Object.values(ContentCategoriesNames)}
                selectedOption={field.value || 'Tipo de archivo'}
                onSelect={(option) => setValue('category', option)}
              />
            )}
          />
          {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
        </div>
        <div className="mt-4 flex h-full flex-col gap-4">
          <div className="flex w-full flex-col items-center justify-center gap-8 py-8 pt-0">
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center gap-2 border-b border-violet-main mt-4 pb-2">
                <Typography
                  text="Subir"
                  variant="p"
                  size="sm"
                  color="violet"
                  weight="medium"
                />
                <Upload size={20} className="text-violet-main" />
                <div className='w-full relative'>
                  <Controller
                    control={control}
                    name="fileUrl"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ingrese la URL del archivo"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e);
                          setUrlFilePath(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Link2 size={20} className="bg-white absolute right-2 top-1/2 -translate-y-1/2 text-violet-main" />
                </div>
              </div>
            </div>
            <div className='relative w-full justify-items-center'>
              <input
                type="file"
                className=" absolute top-0 h-full w-full cursor-pointer opacity-0"
                onChange={(e) => setValue('file', e.target.files?.[0])}
              />
              {(type === 'DOCUMENT' || type === 'ACTIVITY' || type === 'ARTICLE') && (
                <FileText size={72} className="text-violet-main" />
              )}
              {(type === 'VIDEO' || type === 'TUTORIAL') && (
                <Youtube size={72} className="text-violet-main" />
              )}
              {(type === 'IMAGE' || type === 'MARKETING') && (
                <Image size={72} className="text-violet-main" />
              )}
            </div>

          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <label className="flex items-center gap-2">
            <Controller
              control={control}
              name="notifyUser"
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  className="cursor-pointer"
                  checked={field.value}
                  value={undefined}
                />
              )}
            />
            <span>Notificar al usuario</span>
          </label>
          <Button
            variant="primary"
            text="Subir archivo"
            className="ms-auto items-center justify-center !py-0 font-semibold"
            icon={<ChevronRight size={20} color="white" />}
            iconPosition="right"
          />
        </div>
      </form>
      {confirmModal && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/50' >
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 p-4 py-8" onClick={() => setConfirmModal(false)}>
            <ConfirmUploadModal
              loading={loading}
              type="confirm"
              setConfirmModal={() => handleSubmit(onSubmit)()}
              setDeleteModal={() => { }}
              success={success}
              error={error}
              setOpenModal={setConfirmModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileModal;
