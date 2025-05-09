"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./InputForm/InputForm";
import RadioGroup from "./CheckboxGroup/RadioGroup";
import Button from "../ui/Button";
import { LeadFormData } from "../../types/lead/leadTypes";
/* import { constFetch } from "../../services/custom-fetch/constFetch";
import { responseApi } from "../../types/response-api/resaponseApi"; */
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { postLead } from "@/services/public/postLeadForm";
import { ILeads } from "@/interfaces/IAdmin.interfaces";
import ResponseModal from "../ui/ResponseModal";

const defaultOptions = {
	country: [
		{ label: "Argentina", value: "Argentina" },
		{ label: "Brasil", value: "Brasil" },
		{ label: "Chile", value: "Chile" },
		{ label: "Uruguay", value: "Uruguay" },
		{ label: "Otro", value: "Otro" },
	],
	targetUsers: [
		{ label: "Adulto", value: "Adult" },
		{ label: "Niño/Adolescente", value: "Children" },
		{ label: "Profesional", value: "Professional" },
		{ label: "Tu paciente", value: "Patient" },
	],
	usageContext: [
		{ label: "Solo estoy investigando", value: "INVESTIGATING" },
		{ label: "TDAH diagnosticado", value: "ADHD_DIAGNOSED" },
		{ label: "Medicación recetada", value: "PRESCRIPTION_MEDICATION" },
		{ label: "Sin Tratamiento", value: "NO_TREATMENT" },
		{ label: "En Tratamiento", value: "IN_TREATMENT" },
		{ label: "Otro", value: "OTHER" },
	],
	complementTreatment: [
		{ label: "Neurofeedback", value: "NEUROFEEDBACK" },
		{ label: "App de concentración", value: "BRAINAPP" },
		{ label: "Ninguno", value: "OTHER" },
		{ label: "Solo estoy investigando", value: "INVESTIGATION" },
	],
	leadType: [
		{ label: "Profesional", value: "PROFESSIONAL" },
		{ label: "Individual", value: "INDIVIDUAL" },
		{ label: "Empresa", value: "CORPORATE" },
	],
};

interface LeadFormProps {
	type: "PROFESSIONAL" | "INDIVIDUAL" | "CORPORATE";
	handleLeadClick: () => void;
}

export function LeadForm({ type, handleLeadClick }: LeadFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseMessage, setResponseMessage] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILeads>();

	const onSubmit: SubmitHandler<ILeads> = async (data: ILeads) => {
		setIsLoading(true);
		console.log("Form data:", data);
		data.leadType = type;
		// Set phoneNumber to undefined if not provided
		try {
			/* await constFetch<responseApi<ILeads>, ILeads>({
				endpoint: "/leads",
				requestType: "POST",
				body: data,
			}); */
			await postLead(data);
			setSuccess(true);
			setResponseMessage("El formulario fue enviado con éxito, a la brevedad nos comunicaremos con usted. Muchas gracias");
		} catch (error) {
			console.error("Error submitting form:", error);
			setResponseMessage("Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-xl bg-neutral-white2 p-2 px-6 shadow-md lg:px-12"
		>
			<h3 className="py-4 text-center font-poppins text-[22px] font-semibold text-violet-main">
				SOLICITAR INFORMACIÓN
			</h3>
			{(["name", "lastName", "email", "phoneNumber"] as (keyof LeadFormData)[]).map((name) => (
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
					placeholder={`Escriba aquí su ${name === "name"
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
					required={name !== "institution" && name !== "phoneNumber"}
					error={errors[name]?.message || undefined}
				/>
			))}

			{(["country", "targetUsers", "usageContext", "complementTreatment",] as (keyof LeadFormData)[]).map(
				(name) => (
					<RadioGroup
						key={name}
						title={
							name === "country"
								? "¿Dónde te encuentras?"
								: name === "targetUsers"
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
				)
			)}

			<fieldset className="rounded-md border-none shadow-md">
				<legend className="mb-[12px] font-poppins text-[14px] font-semibold text-green-500">Mensaje</legend>
				<textarea
					id="notes"
					{...register("notes")}
					placeholder="Escriba aqui su mensaje"
					className="h-[107px] w-full resize-none rounded-[6px] border-2 border-violet-main bg-white py-4 pl-4 font-poppins text-[14px] text-blackNeutral-200"
				/>
			</fieldset>

			<div className="flex items-center justify-center">
				<label className="flex h-[50px] items-center space-x-2 text-green-500">
					<input type="checkbox" className="peer hidden" {...register("newsletterSubscription")} />
					<span className="h-5 w-5 rounded-sm border-2 border-violet-main peer-checked:border-violet-main peer-checked:bg-violet-main peer-checked:after:absolute peer-checked:after:left-1 peer-checked:after:top-1 peer-checked:after:text-white peer-checked:after:content-['✔']"></span>
					<span>Suscribirme al newsletter</span>
				</label>
			</div>

			{!isLoading ? (
				<Button text="Enviar" variant="primary" className="flex items-center justify-center" />
			) : (
				<Button text="Cargando" variant="primary" icon={<Loader2 className="animate-spin" />} iconPosition="right" className="flex items-center justify-center" disabled={true} />
			)
			}
			{success && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<ResponseModal
						type="success"
						title="FORMULARIO ENVIADO"
						message={responseMessage || ""}
						onClose={() => {
							setSuccess(false);
							handleLeadClick();
						}}
					/>
				</div>
			)}
		</form>
	);
}
