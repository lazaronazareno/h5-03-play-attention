"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/libs/userSchema";
import { Input } from "@/components/inputs/Input";
import { constFetch } from "../../../services/custom-fetch/constFetch";
import { responseApi } from "../../../types/response-api/resaponseApi";
import { ResponseSignIn } from "../../../types/auth/authTypes";
import { User } from "../../../types/user/userTypes";
import { defaultUser } from "../../../constants/dataDefault";

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
	hasFooter: boolean;
}
// ----------------- BORRAR LUEGO -------------------
const userExists: User | "" = JSON.parse(localStorage.getItem("user") || "") || defaultUser;
const tokenExists = localStorage.getItem("token") !== null;
// --------------------------------------------------

export function LoginForm({ hasFooter }: LoginFormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const router = useRouter();

	// --------------------- BORRAR LUEGO -------------------
	if (userExists && tokenExists) {
		// Cambiar ruta de front a su respectivo dashboard
		if (userExists.roles.includes("ROLE_ADMIN")) window.location.href = "/dashboard";
		return (
			<>
				<div className="w-full h-full flex items-center justify-center text-[22px] font-roboto font-bold text-green-500">
					Ya tienes acceso a Play Attention
				</div>
			</>
		);
	}
	// -----------------------------------------------------

	const onSubmit = async (data: LoginFormData) => {
		console.log(data);
		try {
			const response = await constFetch<responseApi<ResponseSignIn>, LoginFormData>({
				endpoint: "/auth/signin",
				requestType: "POST",
				body: data,
			});
			localStorage.setItem("token", response.data?.data?.token || "");
			/* ------------ BORRAR LUEGO ------------------- */
			localStorage.setItem("user", JSON.stringify(response.data?.data?.user || ""));
			/* --------------------------------------------- */
			// cambiar ruta de front a su respectivo dashboard
			if (response.data?.data?.user.roles.includes("ROLE_ADMIN")) router.push("/dashboard");

			if (response.data?.data?.user.roles.includes("ROLE_USER")) router.push("/dashboard");
		} catch (err) {
			if (err instanceof Error) {
				console.error("Error de inicio de sesión:", err.message);
			} else {
				console.error("Error desconocido: ", err);
			}
		}
	};

	return (
		<div className="w-[90%] lg:w-[50%] h-full p-4 bg-green-300 rounded-sm shadow-md text-[14px]">
			<div className="w-full flex flex-col items-center justify-center p-6 lg:py-12 gap-12 bg-neutral-white2 rounded-sm font-poppins ">
				<Image src="/branding/LogoFullAR.png" width={400} height={50} alt="LogoImage" className="w-auto h-auto" />

				<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-8">
					<div className="w-full">
						<label htmlFor="email" className="block text-[15px] font-semibold text-green-500 mb-1">
							Email
						</label>
						<Controller
							control={control}
							name="username"
							render={({ field }) => <Input {...field} type="text" placeholder="Escribe tu correo electrónico" />}
						/>
						{errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
					</div>

					<div className="w-full">
						<label htmlFor="password" className="block text-[15px] font-semibold text-green-500 mb-1">
							Contraseña
						</label>
						<Controller
							control={control}
							name="password"
							render={({ field }) => <Input {...field} type="password" placeholder="Escribe tu contraseña" icon />}
						/>
						{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
					</div>

					<button
						type="submit"
						onChange={handleSubmit(onSubmit)}
						className="w-full bg-violet-main text-white py-2 px-4 rounded-sm hover:bg-violet-secondary transition duration-200 cursor-pointer"
					>
						Iniciar sesión
					</button>

					<Link href="/auth/recovery-password" className="">
						Recuperar contraseña
					</Link>
				</form>

				{hasFooter && (
					<div className="w-full flex flex-col items-center  mt-8 space-y-4">
						<p className="text-[22px] font-roboto font-bold text-green-500">¿No tienes acceso a Play Attention?</p>
						<div className="w-full flex flex-col items-center justify-between gap-4">
							<Link href="#" className="w-[60%]">
								<button className="w-full bg-violet-main text-white py-2 px-4 rounded-sm hover:bg-violet-secondary transition duration-200 cursor-pointer">
									Solicitar información
								</button>
							</Link>
							<Link href="#" className="w-[60%]">
								<button className="w-full flex items-center justify-between p-2 rounded-sm text-violet-main border border-violet-main cursor-pointer">
									Reserva tu demostración{" "}
									<span>
										<ChevronRight size={18} />
									</span>
								</button>
							</Link>
						</div>
					</div>
				)}

				{/* Separador */}
				<div className="w-[60%] border border-violet-main mt-8 mb-12"></div>
			</div>
		</div>
	);
}
