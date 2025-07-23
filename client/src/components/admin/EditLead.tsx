"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../inputs/Input";
import Typography from "../ui/Typography";
import { Camera, Pen, Loader2 } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { updateLead } from "@/services/admin/updateLeads";
import { ILeads } from "@/interfaces/IAdmin.interfaces";

// Define schema using zod
const editLeadSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  phoneNumber: z.string().min(10, "El número de teléfono debe tener al menos 10 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
});

type EditLeadFormData = z.infer<typeof editLeadSchema>;

interface EditLeadProps {
  lead: ILeads;
  externalSubmit?: () => void;
}

const EditLead = ({ lead, externalSubmit }: EditLeadProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLeadFormData>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: {
      name: lead.name,
      lastName: lead.lastName,
      phoneNumber: lead.phoneNumber,
      email: lead.email,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: EditLeadFormData) => {
    console.log("Form Data:", data);
    setIsLoading(true);
    setSuccess(false);
    setError(false);

    try {
      // Simulate API call
      const response = await updateLead({ ...lead, ...data });
      if (response.status === 200) {
        setSuccess(true);
        setError(false);
        console.log("Lead updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      setError(true);
    } finally {
      setIsLoading(false);
      if (externalSubmit) {
        externalSubmit();
      }
    }
  };

  return (
    <div className="shadow-main flex h-min min-w-[345px] flex-col gap-4 rounded-md border border-violet-main bg-neutral-white2 p-4" onClick={(e) => e.stopPropagation()} >
      <div className="relative flex w-max cursor-pointer justify-center self-center overflow-hidden rounded-full border border-violet-main">
        <Image
          src="/landing/testimonies/1.png"
          alt="Lead"
          width={141}
          height={141}
          className="rounded-full bg-green-300"
        />
        <Camera
          size={24}
          className="absolute bottom-0 left-1/2 w-32 -translate-x-1/2 rounded-b-full bg-green-300 text-white"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Typography
            variant="p"
            text="Nombre"
            weight="semibold"
            size="sm"
            color="green"
            className="mb-2"
          />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Escriba nuevo nombre"
                icon={<Pen size={20} className="text-violet-main" />}
              />
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Typography
            variant="p"
            text="Apellido"
            weight="semibold"
            size="sm"
            color="green"
            className="mb-2"
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Escriba nuevo apellido"
                icon={<Pen size={20} className="text-violet-main" />}
              />
            )}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <Typography
            variant="p"
            text="Número de teléfono"
            weight="semibold"
            size="sm"
            color="green"
            className="mb-2"
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Escriba nuevo número de teléfono"
                icon={<Pen size={20} className="text-violet-main" />}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <Typography
            variant="p"
            text="E-mail"
            weight="semibold"
            size="sm"
            color="green"
            className="mb-2"
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Escribe nuevo e-mail"
                icon={<Pen size={20} className="text-violet-main" />}
              />
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4 flex h-12 gap-2">
          {!isLoading ? (
            <Button
              variant="primary"
              text="Aplicar"
              className="flex-1 items-center justify-center !py-0 font-semibold"
            />
          ) : (
            <Button
              text="Cargando"
              variant="primary"
              icon={<Loader2 className="animate-spin" />}
              iconPosition="right"
              className="flex-1 items-center justify-center !py-0 font-semibold"
              disabled={true}
            />
          )}
          <Button
            variant="secondary"
            text="Cancelar"
            className="flex-1 items-center justify-center !py-0 font-semibold"
            onClick={() => {
              if (externalSubmit) {
                externalSubmit();
              }
            }}
          />
        </div>

        {success && (
          <p className="mt-1 text-sm text-green-600">Lead actualizado con éxito</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">Error al actualizar el lead</p>
        )}
      </form>
    </div>
  );
};

export default EditLead;
