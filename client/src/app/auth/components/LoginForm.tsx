"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/userSchema";
import type { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		console.log("Datos del formulario:", data);
		// Integracion con backend
	};

	return (
		<div className="w-[90%] lg:w-[50%] h-full p-4 bg-green-300 rounded-sm shadow-md text-[14px]">
			<div className="w-full flex flex-col items-center justify-center p-6 gap-12 bg-neutral-white2 rounded-sm font-poppins ">

				<Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' />

				<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-8">
					<div className="w-full">
						<label htmlFor="email" className="block text-[15px] font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							{...register("email")}
							placeholder="Escribe aquí tu correo electrónico"
							className="w-full px-4 py-2 border border-violet-main rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
						)}
					</div>

					<div className="w-full">
						<label htmlFor="password" className="block text-[15px] font-medium text-gray-700 mb-1">
							Contraseña
						</label>
						<input
							type="password"
							{...register("password")}
							placeholder="Escribe aquí tu contraseña"
							className="w-full px-4 py-2 border border-violet-main rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
						)}
					</div>

					<button
						type="submit"
						onChange={handleSubmit(onSubmit)}
						className="w-full bg-violet-main text-white py-2 px-4 rounded-sm hover:bg-violet-secondary transition duration-200 cursor-pointer"
					>
						Iniciar sesión
					</button>

					<Link href="#" className="">
						Recuperar contraseña
					</Link>
				</form>

				{/* Footer */}
				<div className="w-full flex flex-col items-center  mt-8 space-y-4">
					<p className="text-[20px] font-roboto text-black font-bold text-shadow-green-500">
						¿No tienes acceso a Play Attention?
					</p>
					<div className="w-full flex flex-col items-center justify-between gap-4">
						<Link href="#" className="w-3/4">
							<button
								className="w-full bg-violet-main text-white py-2 px-4 rounded-sm hover:bg-violet-secondary transition duration-200 cursor-pointer"
							>
								Solicitar información
							</button>
						</Link>
						<Link href="#" className="w-3/4">
							<button className="w-full flex items-center justify-between p-2 rounded-sm text-violet-main border border-violet-main cursor-pointer">Reserva tu demostración <span><ChevronRight size={18} /></span></button>
						</Link>
					</div>
					{/* Separador */}
					<div className="w-full border border-violet-main mt-8 mb-12"></div>
				</div>
			</div>
		</div>
	);
}
