'use client'
import Image from 'next/image'
import React from 'react'
import LoginImg from '../../../public/landing/loginImg.jpg'
import Symbol from '../../../public/branding/LogoSymbol.png'
import { LoginForm } from './components/LoginForm'


export default function AuthPage() {
	return (
		<main className="flex min-h-screen w-full flex-col items-center gap-12 bg-white px-4 py-20 pt-12 text-black">
			<div className='flex flex-col items-center gap-16 space-y-6 lg:flex-row'>
				<div className='flex w-[80%] flex-col items-center space-y-10 lg:w-[50%]'>
					<h1 className='gap-1 text-4xl font-semibold text-green-main'>
						La esperanza y la claridad están a tu alcance
						<span className='ml-2 inline-block align-text-bottom'>
							<Image
								src={Symbol}
								alt='Signo de exclamación decorativo'
								width={13}
								height={16}
								className='h-auto w-auto'
							/>
						</span>
					</h1>

					<Image src={LoginImg} alt='LoginImage' width={450} height={300} className='h-auto w-auto rounded-md' />
				</div>
				<LoginForm hasFooter />
			</div>

		</main>
	)
}
