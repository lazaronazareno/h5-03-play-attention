"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./InputForm/InputForm";
import RadioGroup from "./CheckboxGroup/RadioGroup";
import Button from "../ui/Button";
import { LeadFormData } from "../../types/lead/leadTypes";
import { constFetch } from "../../services/custom-fetch/constFetch";
import { responseApi } from "../../types/response-api/resaponseApi";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
		{ label: "Neurofeedback", value: "neurofeedback" },
		{ label: "App de concentración", value: "brainApp" },
		{ label: "Ninguno", value: "no" },
		{ label: "Solo estoy investigando", value: "investigation" },
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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LeadFormData>();

	const onSubmit: SubmitHandler<LeadFormData> = async (data: LeadFormData) => {
		setIsLoading(true);
		console.log("Form data:", data);
		data.complementTreatment = "NEUROFEEDBACK";
		data.leadType = type;
		// Set phoneNumber to undefined if not provided
		try {
			await constFetch<responseApi<LeadFormData>, LeadFormData>({
				endpoint: "/leads",
				requestType: "POST",
				body: data,
			});
			setResponseMessage("Formulario Enviado! Gracias por tu interés en Play Attention. Nos pondremos en contacto contigo pronto.");
		} catch (error) {
			console.error("Error submitting form:", error);
			setResponseMessage("Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.");
		} finally {
			setIsLoading(false);
		}
		setResponseMessage("Formulario Enviado! Gracias por tu interés en Play Attention. Nos pondremos en contacto contigo pronto.");
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md mx-auto px-6 lg:px-12 p-2 bg-neutral-white2 rounded-xl shadow-md flex flex-col gap-3"
		>
			<h3 className="text-violet-main font-semibold text-[22px] text-center py-4 font-poppins">
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

			<fieldset className="border-none rounded-md shadow-md ">
				<legend className="text-[14px] font-poppins font-semibold text-green-500 mb-[12px]">Mensaje</legend>
				<textarea
					id="notes"
					{...register("notes")}
					placeholder="Escriba aqui su mensaje"
					className="py-4 resize-none bg-white h-[107px] w-full rounded-[6px] border-2 border-violet-main font-poppins text-[14px] text-blackNeutral-200 pl-4"
				/>
			</fieldset>

			<div className="flex justify-center items-center">
				<label className="flex items-center space-x-2 h-[50px] text-green-500">
					<input type="checkbox" className="hidden peer" {...register("newsletterSubscription")} />
					<span className="w-5 h-5 border-2 border-violet-main rounded-sm peer-checked:bg-violet-main peer-checked:border-violet-main peer-checked:after:content-['✔'] peer-checked:after:text-white peer-checked:after:absolute peer-checked:after:top-1 peer-checked:after:left-1"></span>
					<span>Suscribirme al newsletter</span>
				</label>
			</div>

			{!isLoading ? (
				<Button text="Enviar" variant="primary" className="flex justify-center items-center" />
			) : (
				<Button text="Cargando" variant="primary" icon={<Loader2 className="animate-spin" />} iconPosition="right" className="flex justify-center items-center" disabled={true} />
			)
			}
			{responseMessage && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
						<p className="text-center text-green-500 font-poppins text-[16px]">{responseMessage}</p>
						<button
							onClick={() => handleLeadClick()}
							className="cursor-pointer mt-4 w-full bg-violet-main text-white py-2 px-4 rounded-lg hover:bg-violet-dark transition"
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</form>
	);
}
