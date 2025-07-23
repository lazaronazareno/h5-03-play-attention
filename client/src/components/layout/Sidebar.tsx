import { dashboardLinks } from '@/constants/dashboardLinks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'
import { CircleHelp, LogOut } from 'lucide-react'
import { deleteUserCookie } from '@/services/auth/logout'

interface SidebarProps {
	isOpen: boolean
	onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
	const router = useRouter()

	const handleLogout = async () => {
		await deleteUserCookie()
		onClose()
		router.push('/')
	}

	return (
		<aside
			className={`
        fixed top-16 left-0 font-poppins md:top-18 w-58 h-[calc(100vh-4rem)] bg-violet-100 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:top-0 md:h-screen md:block
      `}
		>
			<nav className='flex flex-col gap-2 px-2 py-4'>
				{dashboardLinks.map(({ title, href, icon: Icon }) => (
					<Link
						key={title}
						href={href}
						onClick={onClose}
						className='flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-violet-200'
					>
						<Icon size={20} />
						<span>{title}</span>
					</Link>
				))}
				<button
					onClick={handleLogout}
					className='flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-violet-200'
				>
					<LogOut size={20} />
					<span>Salir</span>
				</button>
				<div className='mt-4 w-full'>
					<Button text='Ayuda' variant='primary' icon={<CircleHelp />} iconPosition='right' onClick={() => { router.push('/dashboard/support') }} className='hidden h-12 w-[90%] items-center justify-center md:flex' />
				</div>
				<div className='mt-60 flex gap-6 p-2'>
					<button className='cursor-pointer'>Español</button>
					<button className='cursor-pointer'>Ingles</button>
				</div>
			</nav>
		</aside>
	)
}
