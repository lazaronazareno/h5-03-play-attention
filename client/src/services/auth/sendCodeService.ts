interface SendCodeResponse  {
	success: boolean
	message: string
}

export const sendCodeService = async (email: string): Promise<SendCodeResponse> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-code`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		})

		if (!res.ok) return { success: false, message: 'Error del servidor' }

		return { success: true, message: 'Código enviado' }

	} catch (error) {
		console.error(error)
		return { success: false, message: 'Error del servidor' }
	}
}
