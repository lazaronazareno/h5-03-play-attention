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
    },
  });
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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
      filePath: getFilePathByType(type),
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
    <div className="flex flex-col bg-white rounded-md shadow-main border border-violet-main w-[700px] p-4">
      <Typography text="Subir archivo" variant="p" color="violet" size="small-title" weight="semibold" className="mb-4" />
      <form onSubmit={handleSubmit(handleConfirm)} className="flex flex-col gap-4">
        <div className="flex gap-2 items-center mb-4">
          <Typography variant="p" text="Título" weight="semibold" size="sm" color="default" className="w-32" />
          <div className="w-full">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Título" />
              )}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
        </div>
        <div className="flex gap-2 items-center mb-4">
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
        <div className="flex gap-2 items-center">
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
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div className="flex flex-col gap-4 mt-4 h-full">
          <div className="relative flex flex-col items-center justify-center p-4 gap-8 py-8 w-full">
            <div className="w-full border-b border-violet-main flex items-center gap-2">
              <Typography
                text="Subir"
                variant="p"
                size="sm"
                color="violet"
                weight='medium'
              />
              <Upload size={20} className="text-violet-main" />
              {control._formValues.file && (
                <>
                  <Typography
                    text={control._formValues.file.name}
                    variant="p"
                    size="sm"
                    color="default"
                    weight='normal'
                    className="ml-2 truncate"
                  />
                  <Link2 size={20} />
                </>
              )}
            </div>
            <input
              type="file"
              className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
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
        <div className="flex gap-2 mt-4">
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
            className="ms-auto !py-0 items-center justify-center font-semibold"
            icon={<ChevronRight size={20} color="white" />}
            iconPosition="right"
          />
        </div>
      </form>
      {confirmModal && (
        <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center' >
          <div className="relative flex flex-col items-center justify-center p-4 gap-8 py-8 w-full h-full" onClick={() => setConfirmModal(false)}>
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