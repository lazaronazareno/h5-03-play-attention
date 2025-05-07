import Button from '@/components/ui/Button'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import React from 'react'

interface PaymentCardProps {
	title: string
	price: string
	description?: string
	checkList: string[]
}

export default function PaymentCard({ title, price, description, checkList }: PaymentCardProps) {
	return (
		<div className='flex flex-col gap-12 p-8 w-lg border-18 rounded-tl-none rounded-tr-4xl rounded-bl-4xl rounded-br-none border-violet-main text-violet-main'>
			<div className='flex flex-col items-center gap-2'>
				<h3 className='text-[40px] font-semibold'>{title}</h3>
				<p className='text-[35px] font-semibold'>$ {price}</p>
				{description && <p className='text-sm font-semibold'>{description}</p>}
				<p className='text-sm font-semibold'>Impuestos incluidos</p>
			</div>
			<div className='flex flex-col gap-4 text-green-500 font-poppins font-semibold'>
				{checkList.map((item, index) => (
					<div key={index} className='flex items-start gap-4'>
						<CheckCircle2 size={26} color='white' fill='currentColor' />
						<p>{item}</p>
					</div>
				))}
			</div>
			<div className='w-3/4 mx-auto'>
				<Button text='Reserva tu demostración' variant='primary' icon={<ChevronRight  />} iconPosition='right' />
			</div>
		</div>
	)
}
