import Image from 'next/image'
import React from 'react'
import LoginImg from '../../../public/landing/loginImg.jpg'
import Symbol from '../../../public/branding/LogoSymbol.png'
import { LoginForm } from './components/LoginForm'


export default function AuthPage() {
	return (
		<main className="w-full min-h-screen flex flex-col items-center gap-12  bg-white text-black pt-12 px-4 py-20">
			<div className='flex flex-col lg:flex-row items-center gap-16 space-y-6'>
				<div className='flex flex-col items-center w-[80%] lg:w-[50%] '>
					<h1 className='text-4xl font-semibold text-green-main'>La esperanza y la claridad estan a tu alcance <span><Image src={Symbol} alt='symbol' width={16} height={24} /></span>
					</h1>
					<Image src={LoginImg} alt='LoginImage' width={450} height={300} className='w-full rounded-md' />
				</div>
				<LoginForm />
			</div>

		</main>
	)
}
