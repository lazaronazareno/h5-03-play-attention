import Image from 'next/image'
import { useState } from 'react'


export default function ForgotPassForm({ onNext }: { onNext: (email: string) => void }) {
	const [email, setEmail] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await fetch("/mail/recover-password", {
				method: "POST",
				body: JSON.stringify({ email }),
			});
			console.log('Email enviado a:', email)
			onNext(email);
		} catch (err) {
			if (err instanceof Error) {
				console.error('Error de inicio de sesión:', err.message)
			} else {
				console.error('Error desconocido: ', err)
			}
		}


	}

	return (
		<div className="h-full w-full rounded-sm bg-green-300 p-4 text-[14px] shadow-md lg:w-[50%]">
			<div className="flex w-full flex-col items-center gap-12 rounded-sm bg-neutral-white2 py-12 font-poppins">
				<Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="h-auto w-auto" />
				<form onSubmit={handleSubmit} className='flex w-full flex-col items-center justify-center space-y-8 p-4'>
					<h2 className='text-lg font-semibold'>VERIFICACIÓN DE SEGURIDAD</h2>
					<input
						type='email'
						className='w-full rounded border border-violet-main p-3 hover:border-2 hover:border-violet-main'
						placeholder='Ingresa tu email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button type='submit' className='w-full cursor-pointer rounded bg-violet-main p-3 text-white'>
						Enviar código
					</button>
				</form>

				{/* Separador */}
				<div className="mb-12 mt-8 w-[50%] border border-violet-main"></div>
			</div>
		</div >

	)
}
