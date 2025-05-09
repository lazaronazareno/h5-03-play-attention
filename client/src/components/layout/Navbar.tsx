'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
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
		if (isMobile) {
			setMenuOpen(false)
		}
		serOpenLead(!openLead)
	}

	const pathname = usePathname()
	const path = pathname.split('/')[1]

	const getLeadTypeByPath = (path: string) => {
		switch (path) {
			case '/professionals':
				return 'PROFESSIONAL'
			case '/enterprises':
				return 'CORPORATE'
			default:
				return 'INDIVIDUAL'
		}
	}

	return (
		<header className='flex w-full justify-center px-4 pt-[120px] lg:px-10'>
			<nav
				ref={navbarRef}
				className='fixed top-4 z-50 flex w-[96%] flex-col items-center justify-between rounded-xl bg-neutral-white2 p-4 shadow-xl lg:flex-row'
			>
				{/* Logo and main navigation container */}
				<div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
					{/* Logo and mobile menu button */}
					<div className='flex w-full items-center justify-between lg:w-auto'>
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
										className='h-auto w-auto'
									/>
								</Link>

								{/* Logo dropdown arrow - MOBILE (only when menu is open) */}
								{isMobile && menuOpen && (
									<button
										onClick={() => toggleDropdown('logo')}
										className='absolute right-[-24px] top-1/2 -translate-y-1/2 transform lg:hidden'
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
											className='block px-4 py-3 text-sm hover:bg-neutral-gray'
										>
											{sublink.title}
										</Link>
									))}
								</div>
							</div>
						</div>

						<button
							className='p-2 lg:hidden'
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
						<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0'>
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
											className='text-blackneutral-main font-semibold hover:text-violet-main lg:text-[14px]'
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
													className='block px-4 py-3 text-sm hover:bg-neutral-gray'
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
								className='h-[45px] w-full items-center justify-center rounded-lg border border-violet-main text-[12px] lg:w-auto lg:justify-start'
								onClick={() => router.push('/auth')}
							/>
							<Button
								text='Solicitar información'
								variant='primary'
								className='h-[45px] w-full items-center justify-center rounded-lg border border-violet-main text-[12px] lg:w-auto lg:justify-start'
								onClick={handleLeadClick}
							/>
						</div>
					</div>
				</div>
			</nav>
			{openLead && (
				<div className='fixed left-0 top-0 z-50 h-full w-full overflow-auto bg-black/20' onClick={handleLeadClick}>
					<div className='absolute left-1/2 top-10 w-full max-w-[450px] -translate-x-1/2' onClick={e => e.stopPropagation()}>
						<button className='size-6 absolute right-2 top-2 m-2 cursor-pointer rounded-full border-2 border-violet-main' onClick={handleLeadClick}>
							<X size={20} strokeWidth={3} className='text-violet-main' />
						</button>
						<LeadForm type={getLeadTypeByPath(path) as "PROFESSIONAL" | "INDIVIDUAL" | "CORPORATE"} handleLeadClick={handleLeadClick} />
					</div>
				</div>
			)}
		</header>
	)
}


