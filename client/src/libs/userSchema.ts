import { z } from "zod"

export const loginSchema = z.object({
	email: z.string()
		.min(1, 'El email es requerido')
		.email('Ingresa un email valido'),
	password: z.string()
		.min(1, 'La contraseña es requerida')
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
})
