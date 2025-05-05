'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { navLinks, logoLinks } from '@/constants/navLinks'
import Button from '../ui/Button'
import { LeadForm } from '../form-leads/LeadsForm'

export default function Navbar() {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const navbarRef = useRef<HTMLDivElement>(null)
	const dropdownTimers = useRef<{ [key: string]: NodeJS.Timeout }>({})
	const router = useRouter()
	const [openLead, serOpenLead] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024)
			if (window.innerWidth >= 1024) {
				setMenuOpen(false)
				setOpenDropdown(null)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
				setOpenDropdown(null)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleDropdownEnter = (key: string) => {
		clearDropdownTimer(key)
		setOpenDropdown(key)
	}

	const handleDropdownLeave = (key: string) => {
		dropdownTimers.current[key] = setTimeout(() => {
			if (openDropdown === key) {
				setOpenDropdown(null)
			}
		}, 200)
	}

	const clearDropdownTimer = (key: string) => {
		if (dropdownTimers.current[key]) {
			clearTimeout(dropdownTimers.current[key])
			delete dropdownTimers.current[key]
		}
	}

	const toggleDropdown = (key: string) => {
		if (isMobile) {
			setOpenDropdown(prev => (prev === key ? null : key))
		}
	}

	const handleLinkClick = () => {
		if (isMobile) {
			setMenuOpen(false)
		}
		setOpenDropdown(null)
	}

	const handleLeadClick = () => {
		serOpenLead(!openLead)
	}

	return (
		<header className='w-full px-4 lg:px-10 pt-[120px]'>
			<nav
				ref={navbarRef}
				className='flex flex-col lg:flex-row bg-neutral-white2 items-center justify-between p-4 rounded-xl shadow-xl'
			>
				{/* Logo and main navigation container */}
				<div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between'>
					{/* Logo and mobile menu button */}
					<div className='w-full flex justify-between items-center lg:w-auto'>
						<div className='relative'>
							{/* Logo with dropdown */}
							<div
								className='group'
								onMouseEnter={() => !isMobile && handleDropdownEnter('logo')}
								onMouseLeave={() => !isMobile && handleDropdownLeave('logo')}
							>
								<Link href='/' className='flex items-center'>
									<Image
										src='/branding/LogoFullAR.png'
										alt='Logo'
										width={180}
										height={50}
										className='w-auto h-auto'
									/>
								</Link>

								{/* Logo dropdown arrow - MOBILE (only when menu is open) */}
								{isMobile && menuOpen && (
									<button
										onClick={() => toggleDropdown('logo')}
										className='absolute right-[-24px] top-1/2 transform -translate-y-1/2 lg:hidden'
									>
										<ChevronRight
											size={20}
											className={`transition-transform ${openDropdown === 'logo' ? 'rotate-90' : ''}`}
										/>
									</button>
								)}

								{/* Logo dropdown menu - CONTENT */}
								<div
									className={`
                    ${isMobile ? 'pl-4 mt-2' : 'absolute left-0 top-full mt-1'}
                    bg-neutral-white2 shadow-md rounded-md z-20 w-full lg:w-56
                    ${openDropdown === 'logo' ? 'block' : 'hidden'}
                    ${!isMobile ? 'group-hover:block' : ''}
                  `}
									onMouseEnter={() => !isMobile && handleDropdownEnter('logo')}
									onMouseLeave={() => !isMobile && handleDropdownLeave('logo')}
								>
									{logoLinks[0].submenu.map((sublink) => (
										<Link
											key={sublink.href}
											href={sublink.href}
											onClick={handleLinkClick}
											className='block px-4 py-3 hover:bg-neutral-gray text-sm'
										>
											{sublink.title}
										</Link>
									))}
								</div>
							</div>
						</div>

						<button
							className='lg:hidden p-2'
							onClick={() => setMenuOpen(prev => !prev)}
							aria-label='Toggle menu'
						>
							{menuOpen ? <X size={24} strokeWidth={2} color='#060707' /> : <Menu size={24} strokeWidth={2} color='#060707' />}
						</button>
					</div>

					{/* Main navigation links - aligned with logo on desktop */}
					<div
						className={`
              w-full lg:w-auto mt-6 lg:mt-0 lg:ml-8
              ${menuOpen ? 'flex flex-col' : 'hidden lg:flex lg:flex-row lg:items-center'}
              lg:space-x-20
            `}
					>
						{/* Main links */}
						<div className='flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4'>
							{navLinks.map((link) => (
								<div
									key={link.title}
									className='relative'
									onMouseEnter={() => !isMobile && handleDropdownEnter(link.title)}
									onMouseLeave={() => !isMobile && handleDropdownLeave(link.title)}
								>
									<div
										className={`flex items-center ${link.submenu ? 'cursor-pointer' : ''}`}
										onClick={() => toggleDropdown(link.title)}
									>
										<Link
											href={link.href}
											onClick={handleLinkClick}
											className=' text-blackneutral-main hover:text-violet-main font-semibold lg:text-[14px] '
										>
											{link.title}
										</Link>
										{link.submenu && isMobile && (
											<ChevronRight
												size={20}
												className={`ml-1 transition-transform ${openDropdown === link.title ? 'rotate-90' : ''}`}
											/>
										)}
									</div>

									{link.submenu && (
										<div
											className={`
                        ${isMobile ? 'pl-4 mt-1' : 'absolute left-0 top-full mt-1'}
                        bg-neutral-white2 shadow-md rounded-md z-20 w-full lg:w-56
                        ${openDropdown === link.title ? 'block' : 'hidden'}
                        ${!isMobile ? 'group-hover:block' : ''}
                      `}
											onMouseEnter={() => !isMobile && handleDropdownEnter(link.title)}
											onMouseLeave={() => !isMobile && handleDropdownLeave(link.title)}
										>
											{link.submenu.map((sublink) => (
												<Link
													key={sublink.href}
													href={sublink.href}
													onClick={handleLinkClick}
													className='block px-4 py-3 hover:bg-neutral-gray text-sm'
												>
													{sublink.title}
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</div>

						{/* Buttons - inside hamburger menu on mobile */}
						<div className={`flex flex-col mx-auto lg:flex-row gap-4 mt-6 lg:mt-0 ${isMobile ? 'w-1/2' : ''}`}>
							<Button
								text='Iniciar Sesión'
								variant='secondary'
								icon={<User size={18} />}
								iconPosition='left'
								className='border border-violet-main rounded-lg w-full lg:w-auto items-center justify-center lg:justify-start text-[12px]  h-[45px] '
								onClick={() => router.push('/auth')}
							/>
							<Button
								text='Solicitar información'
								variant='primary'
								className='border border-violet-main rounded-lg w-full lg:w-auto items-center justify-center lg:justify-start text-[12px] h-[45px]'
								onClick={handleLeadClick}
							/>
						</div>
					</div>
				</div>
			</nav>
			{openLead && (
				<div className='fixed top-0 left-0 w-full h-full z-50 bg-black/20 overflow-auto' onClick={handleLeadClick}>
					<div className='absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[450px]' onClick={e => e.stopPropagation()}>
						<button className='absolute top-0 right-0 m-2 rounded-full border border-violet-main cursor-pointer' onClick={handleLeadClick}>
							<X size={24} strokeWidth={1} />
						</button>
						<LeadForm />
					</div>
				</div>
			)}
		</header>
	)
}


