'use client'
import { Input } from '@/components/inputs/Input'
import { resetPasswordService } from '@/services/auth/resetPasswordService'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordForm({ email }: { email: string }) {
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		resetPasswordService(email)
		alert('Contraseña actualizada correctamente')
		router.push('/auth')
	}

	return (
		<div className="w-full lg:w-[50%] h-full p-4 bg-green-300 rounded-sm shadow-md text-[14px]">
			<div className="wfull flex flex-col items-center py-12 gap-12 bg-neutral-white2 rounded-sm font-poppins">
				<Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="w-auto h-auto" />
				<form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center space-y-12 p-12'>
					<h2 className='text-lg font-semibold'>RECUPERAR CONTRASEÑA</h2>
					<div className='flex flex-col gap-2 w-full'>
						<label htmlFor="" className='text-sm font-semibold text-green-500'>Ingrese una nueva contrasaseña</label>
						<Input type='password' placeholder='Escriba aqui su nueva contraseña' onChange={(e) => setPassword(e.target.value)} value={password} icon className='' />
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<label htmlFor="" className='text-sm font-semibold text-green-500'>Confirmar contraseña</label>
						<Input type='password' placeholder='Escriba aqui su nueva contraseña' onChange={(e) => setPassword(e.target.value)} value={password} icon className='' />
					</div>
					<button type='submit' className='bg-violet-600 text-white px-4 py-2 rounded w-full cursor-pointer'>
						Guardar contraseña
					</button>
				</form>

				{/* Separador */}
				<div className="w-[50%] border border-violet-main mt-8 mb-12"></div>
			</div>
		</div >
	)
}
