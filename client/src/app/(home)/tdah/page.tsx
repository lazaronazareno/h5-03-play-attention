"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { postLead } from "@/services/public/postLeadForm";
import { ILeads } from "@/interfaces/IAdmin.interfaces";
import Button from "@/components/ui/Button";
import ResponseModal from "@/components/ui/ResponseModal";

interface FormData {
  name: string;
  lastName: string;
  email: string;
}

export default function TdahPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const notes = "Formulario de TDAH";
    try {
      await postLead({ ...data, notes } as ILeads);
      setSuccess(true);
      setResponseMessage(
        "El formulario fue enviado con éxito, a la brevedad nos comunicaremos con usted. Muchas gracias"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage(
        "Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto justify-center gap-6 px-40">
      <div className="flex flex-col text-start">
        <h3 className="text-violet-main font-semibold text-[22px] py-4 font-poppins">
          CONTACTO
        </h3>
        <p>Completa tus datos y nos contactamos por email 😊.</p>
      </div>
      <div className="w-full max-w-md my-4 p-2 bg-neutral-white2 rounded-xl shadow-md flex flex-col gap-3">

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
          <div>
            <label htmlFor="nombre" className="block font-semibold">
              Nombre:
            </label>
            <input
              id="nombre"
              type="text"
              {...register("name", { required: "Este campo es obligatorio" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="apellido" className="block font-semibold">
              Apellido:
            </label>
            <input
              id="apellido"
              type="text"
              {...register("lastName", { required: "Este campo es obligatorio" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingrese un correo válido",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {!isLoading ? (
            <Button
              text="Enviar"
              variant="primary"
              className="flex justify-center items-center"
            />
          ) : (
            <Button
              text="Cargando"
              variant="primary"
              className="flex justify-center items-center"
              disabled={true}
            />
          )}
        </form>
        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <ResponseModal
              type="success"
              title="FORMULARIO ENVIADO"
              message={responseMessage || ""}
              onClose={() => setSuccess(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}