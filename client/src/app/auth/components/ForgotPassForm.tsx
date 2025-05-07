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
		<div className="w-full lg:w-[50%] h-full p-4 bg-green-300 rounded-sm shadow-md text-[14px]">
			<div className="w-full flex flex-col items-center py-12 gap-12 bg-neutral-white2 rounded-sm font-poppins ">
				<Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="w-auto h-auto" />
				<form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-8 w-full p-4'>
					<h2 className='text-lg font-semibold'>VERIFICACIÓN DE SEGURIDAD</h2>
					<input
						type='email'
						className='border p-3 rounded border-violet-main w-full hover:border-violet-main hover:border-2'
						placeholder='Ingresa tu email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button type='submit' className='bg-violet-main text-white p-3 rounded w-full cursor-pointer'>
						Enviar código
					</button>
				</form>

				{/* Separador */}
				<div className="w-[50%] border border-violet-main mt-8 mb-12"></div>
			</div>
		</div >

	)
}
