'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Bell, CircleHelp, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import Button from '../ui/Button'
import UserAvatar from '../../../public/user/avatar.png'


export default function UserNavbar() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const router = useRouter()

	const toggleSidebar = () => setSidebarOpen(prev => !prev)

	const closeSidebar = () => setSidebarOpen(false)

	return (
		<>
			<header className='fixed top-0 left-0 right-0 z-50 bg-neutral-white2 shadow-xl flex items-center justify-between p-4 text-sm'>
				<div className='flex items-center gap-2'>
					<Image src={UserAvatar} alt='Avatar' width={24} height={24} className='rounded-full w-auto' />
					<p>Jayne Doe</p>
				</div>
				<div className='flex items-center gap-3'>
					<Image src='/branding/LogoFullAR.png' alt='Logo' width={200} height={50} />
				</div>
				<div className='flex gap-4'>
					<button className='text-violet-main cursor-pointer' onClick={() => { console.log('notification') }}><Bell size={24} /></button>
					<Button text='Ayuda' variant='primary' icon={<CircleHelp />} iconPosition='right' onClick={() => { router.push('/dashboard/support') }} className='hidden md:flex items-center justify-center h-12 ' />
					{/* Mobile menu */}
					<button className='md:hidden text-violet-main cursor-pointer' onClick={toggleSidebar}>
						{sidebarOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</header>

			{/* Sidebar visible en mobile o fijo en desktop */}
			<Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
		</>
	)
}

