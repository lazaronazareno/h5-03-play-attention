import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, "nombre de usuario requerido")
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z.string().min(1, "La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
});
