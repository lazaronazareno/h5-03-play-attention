"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Maximize2, MessageCircle, Minus, X } from "lucide-react";
import React, { useState } from "react";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import DropdownLead from "../ui/DropdownLead";
import { LeadStatusNames, LeadTypeNames } from "@/constants/LeadNaming";
import { sendMail } from "@/services/mail/sendMail";
import ResponseModal from "../ui/ResponseModal";
import { IEmailTemplate } from "@/interfaces/IMails.interface";
import { emailTemplates } from "@/constants/emailTemplates";

const emailFormSchema = z.object({
  subject: z.string().min(1, "El asunto es obligatorio"),
  message: z.string().min(1, "El mensaje no puede estar vacío"),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

interface EmailFormProps {
  users: string[];
  from?: string;
  type: "WhatsApp" | "Correo Electrónico" | "Reuniones" | "Campaña" | "Soporte";
  onClick?: (value: boolean) => void;
  onChangeStatus?: (status: string) => void;
}

const EmailForm = ({ users, type, onClick, onChangeStatus }: EmailFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<IEmailTemplate | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onSubmit = async (data: EmailFormData) => {
    console.log("Form Data:", data);
    setIsLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const emailData = {
        to: users.join(", "),
        subject: data.subject,
        message: data.message,
      };
      const response = await sendMail(emailData)
      console.log("Response:", response);
      setSuccess(true);

    } catch (err) {
      console.error("Error al enviar el correo:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-[500px] lg:min-w-[800px] h-full shadow-main">
      <div className="h-full flex flex-col w-full border-b border-violet-main bg-violet-main/10">
        <div className="flex py-4 items-center gap-2">
          {type === "Correo Electrónico" && (
            <>
              <Mail size={24} className="text-violet-main ms-4" />
              <Typography variant="h2" text={type} weight="bold" size="small-title" color="violet" />
            </>
          )}
          {type === "WhatsApp" && (
            <>
              <MessageCircle size={24} className="text-violet-main ms-4" />
              <Typography variant="h2" text={type} weight="bold" size="small-title" color="violet" />
            </>
          )}
          <div className="flex ms-auto gap-2">
            <div className="relative min-w-[200px]">
              <Button
                variant="primary"
                text={
                  currentTemplate?.subject?.slice(0, 40) || "Seleccionar plantilla"
                }
                className="!py-0 items-center justify-center font-semibold "
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setCurrentTemplate(null);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Seleccionar plantilla
                  </div>
                  {Object.values(emailTemplates).map((template) => (
                    <div
                      key={template.subject}
                      className="px-4 py-2 cursor-pointer hover:bg-violet-main/20"
                      onClick={() => {
                        setCurrentTemplate(template);
                        setValue("subject", template.subject);
                        setValue("message", template.message);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {template.subject}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Maximize2 size={24} className="text-violet-main cursor-pointer" />
            <Minus size={24} className="text-violet-main cursor-pointer" />
            <X size={24} className="text-violet-main cursor-pointer" onClick={() => onClick?.(false)} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
          <div className="bg-white border-b border-violet-main flex p-4 gap-2">
            <span className="text-violet-main font-poppins">De: </span>
            <Button variant="primary" text={"Play Attention Argentina"} className="!py-0 items-center justify-center font-semibold !cursor-default" />
          </div>
          <div className="bg-white border-b border-violet-main flex p-4 gap-2">
            <span className="text-violet-main font-poppins">Para: </span>
            {users.map((user, index) => (
              <Button key={index} variant="primary" text={user} className="!py-0 items-center justify-center font-semibold !cursor-default" />
            ))}
          </div>
          <div className="bg-white border-b border-violet-main flex p-4 gap-2">
            <span className="text-violet-main font-poppins">Asunto: </span>
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="flex-1 border rounded-md p-2"
                  placeholder="Escribe el asunto"
                  value={currentTemplate?.subject || field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("subject", e.target.value);
                    setCurrentTemplate((prev) =>
                      prev ? { ...prev, subject: e.target.value } : null
                    );
                  }}
                />
              )}
            />
            {errors.subject && <p className="text-red-600 text-sm">{errors.subject.message}</p>}
          </div>
          <div className="bg-neutral-white2 flex flex-1 h-full">
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full rounded-md p-4 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                  value={currentTemplate?.message || field.value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    field.onChange(newValue);
                    setValue("message", newValue);
                    setCurrentTemplate((prev) =>
                      prev ? { ...prev, message: newValue } : null
                    );
                  }}
                  onBlur={() => {
                    if (currentTemplate?.message && !field.value) {
                      setValue("message", currentTemplate.message);
                    }
                  }}
                />
              )}
            />
            {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
          </div>
          <div className="flex gap-2 bg-white p-4 mt-auto">
            {!isLoading ? (
              <Button
                variant="primary"
                text="Enviar"
                className="!py-0 items-center justify-center font-semibold"
              />
            ) : (
              <Button
                text="Cargando"
                variant="primary"
                className="!py-0 items-center justify-center font-semibold"
                disabled
              />
            )}
            <DropdownLead
              title="Estado"
              options={Object.values(LeadStatusNames)}
              selectedOption={"Estado"}
              onSelect={(option) => onChangeStatus?.(option)}
              background="bg-violet-main text-white"
              dropUp
            />
            <DropdownLead
              title="Usuario"
              options={Object.values(LeadTypeNames)}
              selectedOption={"Usuario"}
              onSelect={(option) => console.log(option)}
              background="bg-violet-main text-white"
              dropUp
            />
          </div>
        </form>
      </div>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ResponseModal
            type="success"
            title="Correo Enviado"
            message="El correo se ha enviado correctamente."
            onClose={() => onClick!(false)}
          />
        </div>
      )}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ResponseModal
            type="error"
            title="Error"
            message="Hubo un error al enviar el correo."
            onClose={() => onClick!(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EmailForm;
