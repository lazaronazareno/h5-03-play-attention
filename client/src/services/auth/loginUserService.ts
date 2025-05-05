export async function loginUserService(email: string, password: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.message || 'Error al iniciar sesión')
	}

	return res.json()
}
