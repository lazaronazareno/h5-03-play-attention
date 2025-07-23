interface ResetPasswordResponse {
	success: boolean
	message: string
}

export const resetPasswordService = async (email: string): Promise<ResetPasswordResponse> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		})

		if (!res.ok) return { success: false, message: 'Error del servidor' }

		return { success: true, message: 'Contraseña actualizada correctamente' }

	} catch (error) {
		console.error(error)
		return { success: false, message: 'Error del servidor' }
	}
}
