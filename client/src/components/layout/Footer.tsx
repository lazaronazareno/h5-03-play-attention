'use client'
import { Facebook, Instagram, Youtube, SendHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import InputWithButton from '../inputs/InputWithButton';

export default function Footer() {
	return (
		<footer className='w-full bg-neutral-white2 font-poppins text-blackneutral-main pb-[36px] pt-[200px] px-6 md:px-40 '>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-40'>
				{/* Direcciones */}
				<div className='flex flex-col justify-between gap-8'>
					<Image src='/branding/LogoFullAR.png' alt='Logo' width={283} height={56} />
					<div className='flex flex-col gap-1 text-blackneutral-main'>
						<p className='text-[16px]'>R. Caamaño 662. Oficina 114. Pilar. Bs.As.</p>
						<p className='text-[16px]'>Las camelias 3324. Pilar. Bs.As. </p>
						<p className='text-[16px]'>+1150535434 | +54 1154936121. </p>
					</div>

					{/* Redes */}
					<div className='flex gap-8'>
						<Link href='https://www.facebook.com/playattentionbsas'>
							<Facebook size={24} color='#6A49F6' />
						</Link>
						<div className='border border-violet-main'></div>
						<Link href='https://www.instagram.com/playattentionbsas/'>
							<Instagram size={24} color='#6A49F6' />
						</Link>
						<div className='border border-violet-main'></div>
						<Link href='https://www.youtube.com/@playattentionbsas'>
							<Youtube size={24} color='#6A49F6' />
						</Link>
					</div>
					<div className='flex gap-6'>
						<button className='text-violet-secondary  hover:border-violet-secondary hover:border-b-2 cursor-pointer'>Español</button>
						<button className='text-violet-secondary  hover:border-violet-secondary hover:border-b-2 cursor-pointer' >Ingles</button>
					</div>
				</div>

				{/* Newsletter */}
				<div className='flex flex-col gap-8 max-w-[300px]'>
					<h3 className='text-2xl font-roboto text-violet-main font-bold'>NEWSLETTER</h3>
					<p className='text-[16px]'>Suscríbete a nuestro boletín y mantente actualizado con todo lo relacionado con el TDAH.</p>
					<InputWithButton type='email' placeholder='Correo' icon={<SendHorizontal size={24} />} onSubmit={() => { }} />
				</div>

			</div>

			{/* Separador */}
			<div className='border-t border-violet-main my-6'></div>

			{/* Copyright */}
			<div className='text-center text-[12px] font-bold font-roboto'>
				<p>Copyright 2025. PLAY ATTENTION. All Rights Reserved.</p>
			</div>

		</footer>
	)
}

