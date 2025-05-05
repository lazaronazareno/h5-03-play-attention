import Image from 'next/image'
import React from 'react'

export default function UserNavbar() {
	return (
		<header className='w-full '>
			<nav className='bg-neutral-white2 flex justify-between items-center p-4 shadow-2xl'>
				{/* User avatar */}
				<div>

				</div>

				{/* Logo */}
				<div>
					<Image src='/branding/LogoFullAR.png' alt='Logo' width={200} height={40} />
				</div>

				{/* Help and notifications */}
				<div>
					<button>notifications</button>
					<button>help</button>
				</div>
			</nav>
		</header>
	)
}

