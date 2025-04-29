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
		<form onSubmit={handleSubmit} className='flex justify-between border border-violet-secondary rounded-md overflow-hidden'>
			<input
				type={type}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={placeholder}
				className='flex-1 px-4 py-2 text-sm focus:outline-none text-blackneutral-main'
			/>
			<button
				type='submit'
				className='bg-violet-secondary p-2 m-[1px] rounded-sm text-white flex items-center justify-center cursor-pointer'
			>
				{icon}
			</button>
		</form>
	)
}
