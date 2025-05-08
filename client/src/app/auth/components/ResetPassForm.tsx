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
		<div className="h-full w-full rounded-sm bg-green-300 p-4 text-[14px] shadow-md lg:w-[50%]">
			<div className="wfull flex flex-col items-center gap-12 rounded-sm bg-neutral-white2 py-12 font-poppins">
				<Image src='/branding/LogoFullAR.png' width={400} height={50} alt='LogoImage' className="h-auto w-auto" />
				<form onSubmit={handleSubmit} className='flex w-full flex-col items-center justify-center space-y-12 p-12'>
					<h2 className='text-lg font-semibold'>RECUPERAR CONTRASEÑA</h2>
					<div className='flex w-full flex-col gap-2'>
						<label htmlFor="" className='text-sm font-semibold text-green-500'>Ingrese una nueva contrasaseña</label>
						<Input type='password' placeholder='Escriba aqui su nueva contraseña' onChange={(e) => setPassword(e.target.value)} value={password} icon className='' />
					</div>
					<div className='flex w-full flex-col gap-2'>
						<label htmlFor="" className='text-sm font-semibold text-green-500'>Confirmar contraseña</label>
						<Input type='password' placeholder='Escriba aqui su nueva contraseña' onChange={(e) => setPassword(e.target.value)} value={password} icon className='' />
					</div>
					<button type='submit' className='w-full cursor-pointer rounded bg-violet-600 px-4 py-2 text-white'>
						Guardar contraseña
					</button>
				</form>

				{/* Separador */}
				<div className="mb-12 mt-8 w-[50%] border border-violet-main"></div>
			</div>
		</div >
	)
}
