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
		<div className='w-lg border-18 rounded-tr-4xl rounded-bl-4xl flex flex-col gap-12 rounded-br-none rounded-tl-none border-violet-main p-8 text-violet-main'>
			<div className='flex flex-col items-center gap-2'>
				<h3 className='text-[40px] font-semibold'>{title}</h3>
				<p className='text-[35px] font-semibold'>$ {price}</p>
				{description && <p className='text-sm font-semibold'>{description}</p>}
				<p className='text-sm font-semibold'>Impuestos incluidos</p>
			</div>
			<div className='flex flex-col gap-4 font-poppins font-semibold text-green-500'>
				{checkList.map((item, index) => (
					<div key={index} className='flex items-start gap-4'>
						<CheckCircle2 size={26} color='white' fill='currentColor' />
						<p>{item}</p>
					</div>
				))}
			</div>
			<div className='mx-auto w-3/4'>
				<Button text='Reserva tu demostración' variant='primary' icon={<ChevronRight  />} iconPosition='right' />
			</div>
		</div>
	)
}
