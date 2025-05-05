'use client'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: boolean
	inputSize?: 'sm' | 'md' | 'lg'
}

export function Input({
	type = 'text',
	icon = false,
	inputSize = 'md',
	className,
	...props
}: InputProps) {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => setShowPassword(prev => !prev)

	const sizeStyles = {
		sm: 'text-sm py-1 px-2',
		md: 'text-base py-2 px-3',
		lg: 'text-lg py-3 px-4'
	}

	const baseStyles = 'w-full border-2 border-violet-main rounded-sm focus:ring-2 focus:ring-violet-main focus:outline-none'

	return (
		<div className='relative'>
			<input
				type={icon && type === 'password' && showPassword ? 'text' : type}
				className={clsx(baseStyles, sizeStyles[inputSize], className)}
				{...props}
			/>
			{icon && type === 'password' && (
				<button
					type='button'
					onClick={togglePasswordVisibility}
					className='absolute top-1/2 right-3 transform -translate-y-1/2 p-1 rounded text-violet-main focus:outline-none'
				>
					{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
				</button>
			)}
		</div>
	)
}
