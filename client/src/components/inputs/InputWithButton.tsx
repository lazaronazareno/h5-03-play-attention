import { useState } from 'react'
import type { ReactNode, FormEvent } from 'react'

interface InputWithButtonProps {
	type?: 'text' | 'email' | 'password' | 'search'
	placeholder?: string
	icon: ReactNode
	onSubmit: (value: string) => void
}

export default function InputWithButton({ type = 'text', placeholder = '', icon, onSubmit }: InputWithButtonProps) {
	const [inputValue, setInputValue] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!inputValue.trim()) return
		onSubmit(inputValue)
		setInputValue('')
	}

	return (
		<form onSubmit={handleSubmit} className='flex justify-between overflow-hidden rounded-md border border-violet-secondary'>
			<input
				type={type}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={placeholder}
				className='text-blackneutral-main flex-1 px-4 py-2 text-sm focus:outline-none'
			/>
			<button
				type='submit'
				className='m-[1px] flex cursor-pointer items-center justify-center rounded-sm bg-violet-secondary p-2 text-white'
			>
				{icon}
			</button>
		</form>
	)
}
