// 'use client'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Menu, X, ChevronDown, User } from 'lucide-react'
// import { useState, useEffect, useRef } from 'react'
// import { navLinks, logoLinks } from '@/constants/navLinks'

// export default function Navbar() {
// 	const [open, setOpen] = useState<string | null>(null)
// 	const [menuOpen, setMenuOpen] = useState(false)
// 	const dropdownRef = useRef<HTMLDivElement>(null)

// 	const toggleMenu = (title: string) => {
// 		setOpen(prev => (prev === title ? null : title))
// 	}

// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// 				setOpen(null)
// 				setMenuOpen(false)
// 			}
// 		}
// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside)
// 		}
// 	}, [])

// 	return (
// 		<header className='w-full py-4 px-6 md:px-16'>
// 			<nav className='bg-neutral-white2 rounded-md shadow-xl p-4 flex items-center justify-between' ref={dropdownRef}>
// 				{/* Logo + Links */}
// 				<div className='flex items-center gap-8'>
// 					{/* Logo con Dropdown */}
// 					<div className='relative'>
// 						<button
// 							onClick={() => toggleMenu('logo')}
// 							className='flex items-center gap-1'
// 						>
// 							<Image src='/logo.png' alt='Play Attention' width={120} height={40} />
// 							<ChevronDown size={16} className={`transition-transform ${open === 'logo' ? 'rotate-180' : ''}`} />
// 						</button>
// 						{open === 'logo' && (
// 							<div className='absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-md p-2 flex flex-col z-20'>
// 								{logoLinks[0].submenu.map(link => (
// 									<Link key={link.title} href={link.href} className='text-neutral-gray text-sm hover:bg-neutral-light p-2 rounded-md'>
// 										{link.title}
// 									</Link>
// 								))}
// 							</div>
// 						)}
// 					</div>

// 					{/* Links principales */}
// 					<ul className='hidden md:flex items-center gap-6'>
// 						{navLinks.map(link => (
// 							<li key={link.title} className='relative'>
// 								<button
// 									onClick={() => toggleMenu(link.title)}
// 									className='flex items-center gap-1 text-neutral-black text-sm'
// 								>
// 									{link.title}
// 									<ChevronDown size={16} className={`transition-transform ${open === link.title ? 'rotate-180' : ''}`} />
// 								</button>
// 								{open === link.title && (
// 									<div className='absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-md p-2 flex flex-col z-20'>
// 										{link.submenu.map(sublink => (
// 											<Link key={sublink.title} href={sublink.href} className='text-neutral-gray text-sm hover:bg-neutral-light p-2 rounded-md'>
// 												{sublink.title}
// 											</Link>
// 										))}
// 									</div>
// 								)}
// 							</li>
// 						))}
// 					</ul>
// 				</div>

// 				{/* Botones */}
// 				<div className='hidden md:flex items-center gap-4'>
// 					<Link href='/login' className='border border-primary-violet text-primary-violet px-4 py-2 rounded-md flex items-center gap-1 text-sm'>
// 						<User size={16} />
// 						Iniciar Sesión
// 					</Link>
// 					<Link href='/solicitar-informacion' className='bg-primary-violet text-white px-4 py-2 rounded-md text-sm shadow-md'>
// 						Solicitar Información
// 					</Link>
// 				</div>

// 				{/* Icono de menú Mobile */}
// 				<div className='md:hidden'>
// 					<button onClick={() => setMenuOpen(prev => !prev)}>
// 						{menuOpen ? <X size={28} /> : <Menu size={28} />}
// 					</button>
// 				</div>
// 			</nav>

// 			{/* Mobile Menu */}
// 			{menuOpen && (
// 				<div className='bg-neutral-white2 rounded-md shadow-lg p-4 mt-2 flex flex-col gap-4 md:hidden'>
// 					{/* Logo Mobile */}
// 					<div>
// 						<button
// 							className='w-full flex justify-between items-center text-neutral-black text-sm'
// 							onClick={() => toggleMenu('logo')}
// 						>
// 							Logo
// 							<ChevronDown className={`ml-2 transition-transform ${open === 'logo' ? 'rotate-180' : ''}`} size={16} />
// 						</button>
// 						{open === 'logo' && (
// 							<div className='pl-4 flex flex-col gap-2 mt-2'>
// 								{logoLinks[0].submenu.map(link => (
// 									<Link key={link.title} href={link.href} className='text-neutral-gray text-sm'>
// 										{link.title}
// 									</Link>
// 								))}
// 							</div>
// 						)}
// 					</div>

// 					{/* Nav Links Mobile */}
// 					{navLinks.map(link => (
// 						<div key={link.title}>
// 							<button
// 								className='w-full flex justify-between items-center text-neutral-black text-sm'
// 								onClick={() => toggleMenu(link.title)}
// 							>
// 								{link.title}
// 								<ChevronDown className={`ml-2 transition-transform ${open === link.title ? 'rotate-180' : ''}`} size={16} />
// 							</button>
// 							{open === link.title && (
// 								<div className='pl-4 flex flex-col gap-2 mt-2'>
// 									{link.submenu.map(sublink => (
// 										<Link key={sublink.title} href={sublink.href} className='text-neutral-gray text-sm'>
// 											{sublink.title}
// 										</Link>
// 									))}
// 								</div>
// 							)}
// 						</div>
// 					))}

// 					{/* Botones Mobile */}
// 					<div className='flex flex-col gap-2 mt-4'>
// 						<Link href='/login' className='border border-primary-violet text-primary-violet px-4 py-2 rounded-md flex items-center justify-center gap-1 text-sm'>
// 							<User size={16} />
// 							Iniciar Sesión
// 						</Link>
// 						<Link href='/solicitar-informacion' className='bg-primary-violet text-white px-4 py-2 rounded-md text-center text-sm shadow-md'>
// 							Solicitar Información
// 						</Link>
// 					</div>
// 				</div>
// 			)}
// 		</header>
// 	)
// }

'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { navLinks, logoLinks } from '@/constants/navLinks'

export default function Navbar() {
	const [open, setOpen] = useState<string | null>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const toggleMenu = (title: string) => {
		setOpen(prev => (prev === title ? null : title))
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(null)
				if (window.innerWidth >= 768) {
					setMenuOpen(false)
				}
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<header className='w-full py-4 px-6 lg:px-16'>
			<nav className='bg-neutral-white2 rounded-md shadow-xl p-4 flex items-center justify-between' ref={dropdownRef}>
				<div className='flex items-center gap-8'>
					<div className='relative'>
						<button onClick={() => toggleMenu('logo')} className='flex items-center gap-1'>
							<Image src='/branding/LogoFull.png' alt='Play Attention' width={120} height={40} />
							{/* Chevron solo en mobile */}
							<ChevronDown size={16} className='md:hidden transition-transform' />
						</button>
						{open === 'logo' && (
							<div className='absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-md p-2 flex flex-col z-20'>
								{logoLinks[0].submenu.map(link => (
									<Link key={link.title} href={link.href} className='text-neutral-gray text-sm hover:bg-neutral-light p-2 rounded-md'>
										{link.title}
									</Link>
								))}
							</div>
						)}
					</div>

					<ul className='hidden md:flex items-center gap-6'>
						{navLinks.map(link => (
							<li key={link.title} className='relative'>
								<Link href={link.href} className='text-neutral-black text-sm'>
									{link.title}
								</Link>
								{/* No chevrons en desktop */}
							</li>
						))}
					</ul>
				</div>

				<div className='hidden md:flex items-center gap-4'>
					<Link href='/login' className='border border-primary-violet text-primary-violet px-4 py-2 rounded-md flex items-center gap-1 text-sm'>
						<User size={16} />
						Iniciar Sesión
					</Link>
					<Link href='/solicitar-informacion' className='bg-primary-violet text-white px-4 py-2 rounded-md text-sm shadow-md'>
						Solicitar Información
					</Link>
				</div>

				<div className='md:hidden'>
					<button onClick={() => setMenuOpen(prev => !prev)}>
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</nav>

			{menuOpen && (
				<div className='bg-neutral-white2 rounded-md shadow-lg p-4 mt-2 flex flex-col gap-4 md:hidden'>
					<div>
						<button className='w-full flex justify-between items-center text-neutral-black text-sm' onClick={() => toggleMenu('logo')}>
							Logo
							<ChevronDown className={`ml-2 transition-transform ${open === 'logo' ? 'rotate-180' : ''}`} size={16} />
						</button>
						{open === 'logo' && (
							<div className='pl-4 flex flex-col gap-2 mt-2'>
								{logoLinks[0].submenu.map(link => (
									<Link key={link.title} href={link.href} className='text-neutral-gray text-sm'>
										{link.title}
									</Link>
								))}
							</div>
						)}
					</div>

					{navLinks.map(link => (
						<div key={link.title}>
							<button className='w-full flex justify-between items-center text-neutral-black text-sm' onClick={() => toggleMenu(link.title)}>
								{link.title}
								<ChevronDown className={`ml-2 transition-transform ${open === link.title ? 'rotate-180' : ''}`} size={16} />
							</button>
							{open === link.title && (
								<div className='pl-4 flex flex-col gap-2 mt-2'>
									{link.submenu.map(sublink => (
										<Link key={sublink.title} href={sublink.href} className='text-neutral-gray text-sm'>
											{sublink.title}
										</Link>
									))}
								</div>
							)}
						</div>
					))}

					<div className='flex flex-col gap-2 mt-4'>
						<Link href='/login' className='border border-primary-violet text-primary-violet px-4 py-2 rounded-md flex items-center justify-center gap-1 text-sm'>
							<User size={16} />
							Iniciar Sesión
						</Link>
						<Link href='/solicitar-informacion' className='bg-primary-violet text-white px-4 py-2 rounded-md text-center text-sm shadow-md'>
							Solicitar Información
						</Link>
					</div>
				</div>
			)}
		</header>
	)
}
