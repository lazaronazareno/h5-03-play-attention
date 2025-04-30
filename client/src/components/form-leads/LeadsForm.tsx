"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./InputForm/InputForm";
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Button from '../ui/Button'

type LeadFormData = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country: "Argentina" | "Brasil" | "Chile" | "Uruguay" | "Otro";
  leadType: "PROFESSIONAL" | "INDIVIDUAL" | "CORPORATE"
  institution?: string;
  targetUsers: "Children" | "Adult" | "Patient" | "Professional";
  usageContext: "Investigation" | "Medication" | "Treatment"| "NoTreatment"| "Other";
  complementTreatment: "neurofeedback" | "no" | "brainApp" | "Investigation";
  notes: string;
  newsletterSubscription: boolean;
};

const API_URL = "http://144.33.15.219:8080/api/lead-controller/leads";

const defaultOptions = {
  country: [
    { label: "Argentina", value: "Argentina"},
    { label: "Brasil", value: "Brasil"},
    { label: "Chile", value: "Chile"},
    { label: "Uruguay", value: "Uruguay"},
    { label: "Otro", value: "Otro"},
  ],
  targetUsers: [
    { label: "Adulto", value: "Adult" },
    { label: "Niño/Adolescente", value: "Children" },
    { label: "Profesional", value: "Professional" },
    { label: "Tu paciente", value: "Patient" },
  ],
  usageContext: [
    { label: "Solo estoy investigando", value: "Investigation" },
    { label: "TDAH diagnosticado", value: "Tdah" },
    { label: "Medicación recetada", value: "Medication" },
    { label: "Sin Tratamiento", value: "NoTreatment" },
    { label: "En Tratamiento", value: "Treatment" },
    { label: "Otro", value: "Other" },
  ],
  complementTreatment: [
    { label: "Neurofeedback", value: "neurofeedback" },
    { label: "App de concentración", value: "brainApp" },
    { label: "Ninguno", value: "no" },
    { label: "Solo estoy investigando", value: "investigation" },
  ],
  leadType: [ 
    { label: "Profesional", value: "PROFESSIONAL" },
    { label: "Individual", value: "INDIVIDUAL" },
    { label: "Empresa", value:  "CORPORATE"},
  ]
};

export function LeadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>();
  
  const onSubmit: SubmitHandler<LeadFormData> = async (data: LeadFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          country: data.country,
          institution: data.institution,
          targetUsers: data.targetUsers,
          usageContext: data.usageContext,
          complementTreatment: data.complementTreatment,
          notes: data.notes,
          newsletterSubscription: data.newsletterSubscription,
          leadType: data.leadType,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        alert(`Formulario enviado con éxito: ${result.message}`);
      } else {
        alert(`Error al enviar formulario: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-2 bg-neutral-white2 rounded-xl shadow-md flex flex-col gap-5"
    >
      <h3 className="text-violet-main font-semibold text-[22px] text-center mb-8 font-poppins">
        SOLICITAR INFORMACIÓN
      </h3>
      {(
        [
          "name",
          "lastName",
          "email",
          "phoneNumber",
        ] as (keyof LeadFormData)[]
      ).map((name) => (
        <Input
          key={name}
          label={
            name === "name"
              ? "Nombre"            
              : name === "lastName"
              ? "Apellido"
              : name === "email"
              ? "Correo electrónico"
              : name === "phoneNumber"
              ? "Teléfono"
              : name
          }
          placeholder={`Escriba aquí su ${
            name === "name"
              ? "nombre"
              : name === "lastName"
              ? "apellido"
              : name === "email"
              ? "correo electrónico"
              : name === "phoneNumber"
              ? "teléfono"
              : name 
          }`}
          name={name}
          register={register}
          required={
            name !== "institution" &&
            name !== "phoneNumber"
          }
          error={errors[name]?.message || undefined}
        />
      ))}

      {(["country", "targetUsers", "usageContext", "complementTreatment", "leadType",] as (keyof LeadFormData)[]).map((name) => (
        <CheckboxGroup
          key={name}
          title={
            name === "country"
            ? "¿Dónde te encuentras?"
            :name === "targetUsers"
            ? "¿Para quién estás buscando información de Play Attention?"
            : name === "usageContext"
            ? "¿En qué situación se encuentra?"
            : name === "complementTreatment"
            ? "¿Has probado algún otro programa?"
            : "¿Cómo clasificarías tu perfil o el propósito de tu interés?"
          }
          name={name}
          register={register}
          errors={errors}
          options={defaultOptions[name as keyof typeof defaultOptions]} 
        />
      ))}

      <fieldset className="border-none rounded-md shadow-md ">
        <legend className="text-[14px] font-poppins font-semibold text-green-500 mb-[12px]">
          Mensaje
        </legend>
        <textarea
          id="notes"
          {...register("notes")}
          placeholder="Escriba aqui su mensaje"
          className="h-[107px] w-full rounded-[6px] border-2 border-violet-main font-poppins text-[14px] text-blackNeutral-200 bg-neutral-white2 pl-4"
        />
      </fieldset>

      <div  className="flex justify-center items-center">
  <label className="flex items-center space-x-2 h-[50px] text-green-500">
    <input
      type="checkbox"
      className="hidden peer"
      {...register("newsletterSubscription")}
    />
    <span className="w-5 h-5 border-2 border-violet-main rounded-sm peer-checked:bg-violet-main peer-checked:border-violet-main peer-checked:after:content-['✔'] peer-checked:after:text-white peer-checked:after:absolute peer-checked:after:top-1 peer-checked:after:left-1"></span>
    <span>Suscribirme al newsletter</span>
  </label>
</div>

      <Button
        text = "Enviar"
        disabled= {isLoading}
        variant= "primary"
        className="flex justify-center items-center" 
      />
    </form>
  );
}