interface VerifyCodeResponse {
	success: boolean
	message?: string
}

export const verifyCodeService = async (email: string, code: string): Promise<VerifyCodeResponse> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, code }),
		})

		if (!res.ok) return { success: false, message: 'Código incorrecto' }

		return { success: true }
	} catch (error) {
		console.error(error)
		return { success: false, message: 'Error del servidor' }
	}
}
