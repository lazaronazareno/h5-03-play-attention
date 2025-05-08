"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/libs/userSchema";
import { Input } from "@/components/inputs/Input";
import { login } from "@/services/auth/loginUserService";
import { useState } from "react";
import Button from "@/components/ui/Button";

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
	hasFooter: boolean;
}

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
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: LoginFormData) => {
		console.log(data);
		setIsLoading(true);

		try {
			const response = await login(data.username, data.password);
			console.log("response", response);
			if (response.data?.user.roles.includes("ROLE_ADMIN")) router.push("/admin");

			if (response.data?.user.roles.includes("ROLE_USER")) router.push("/dashboard");
		} catch (err) {
			if (err instanceof Error) {
				console.error("Error de inicio de sesión:", err.message);
			} else {
				console.error("Error desconocido: ", err);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="h-full w-[90%] rounded-sm bg-green-300 p-4 text-[14px] shadow-md lg:w-[50%]">
			<div className="flex w-full flex-col items-center justify-center gap-12 rounded-sm bg-neutral-white2 p-6 font-poppins lg:py-12">
				<Image src="/branding/LogoFullAR.png" width={400} height={50} alt="LogoImage" className="h-auto w-auto" />

				<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center gap-8">
					<div className="w-full">
						<label htmlFor="email" className="mb-1 block text-[15px] font-semibold text-green-500">
							Nombre de Usuario
						</label>
						<Controller
							control={control}
							name="username"
							render={({ field }) => <Input {...field} type="text" placeholder="Escribe tu correo electrónico" />}
						/>
						{errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
					</div>

					<div className="w-full">
						<label htmlFor="password" className="mb-1 block text-[15px] font-semibold text-green-500">
							Contraseña
						</label>
						<Controller
							control={control}
							name="password"
							render={({ field }) => <Input {...field} type="password" placeholder="Escribe tu contraseña" icon />}
						/>
						{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
					</div>


					{!isLoading ? (
						<button
							type="submit"
							onChange={handleSubmit(onSubmit)}
							className="w-full cursor-pointer rounded-sm bg-violet-main px-4 py-2 text-white transition duration-200 hover:bg-violet-secondary"
						>
							Iniciar sesión
						</button>
					) : (
						<Button text="Cargando" variant="primary" icon={<Loader2 className="animate-spin" />} iconPosition="right" className="flex w-full items-center justify-center !px-4 !py-2" disabled={true} />
					)
					}

					<Link href="/auth/recovery-password" className="">
						Recuperar contraseña
					</Link>
				</form>

				{hasFooter && (
					<div className="mt-8 flex w-full flex-col items-center space-y-4">
						<p className="font-roboto text-[22px] font-bold text-green-500">¿No tienes acceso a Play Attention?</p>
						<div className="flex w-full flex-col items-center justify-between gap-4">
							<Link href="#" className="w-[60%]">
								<button className="w-full cursor-pointer rounded-sm bg-violet-main px-4 py-2 text-white transition duration-200 hover:bg-violet-secondary">
									Solicitar información
								</button>
							</Link>
							<Link href="#" className="w-[60%]">
								<button className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-violet-main p-2 text-violet-main">
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
				<div className="mb-12 mt-8 w-[60%] border border-violet-main"></div>
			</div>
		</div>
	);
}
