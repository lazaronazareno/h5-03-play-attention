'use client'
import Image from 'next/image'
import React from 'react'
import LoginImg from '../../../public/landing/loginImg.jpg'
import Symbol from '../../../public/branding/LogoSymbol.png'
import { LoginForm } from './components/LoginForm'


export default function AuthPage() {
	return (
		<main className="w-full min-h-screen flex flex-col items-center gap-12 bg-white text-black pt-12 px-4 py-20">
			<div className='flex flex-col lg:flex-row items-center gap-16 space-y-6'>
				<div className='flex flex-col space-y-10 items-center w-[80%] lg:w-[50%] '>
					<h1 className='text-4xl text-green-main font-semibold gap-1'>
						La esperanza y la claridad están a tu alcance
						<span className='inline-block align-text-bottom ml-2'>
							<Image
								src={Symbol}
								alt='Signo de exclamación decorativo'
								width={13}
								height={16}
								className='w-auto h-auto'
							/>
						</span>
					</h1>

					<Image src={LoginImg} alt='LoginImage' width={450} height={300} className='w-auto h-auto rounded-md' />
				</div>
				<LoginForm hasFooter />
			</div>

		</main>
	)
}
