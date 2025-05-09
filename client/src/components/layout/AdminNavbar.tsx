'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { LogOut, Settings } from 'lucide-react';
import { ADMIN_LINKS } from '@/constants/adminLinks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteUserCookie } from '@/services/auth/logout';

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter()

  const handleLogout = async () => {
    await deleteUserCookie()
    router.push('/')
  }

  return (
    <header className='shadow-main z-50 flex items-center justify-between bg-neutral-white2 px-9 py-3 text-sm'>
      <div className='flex'>
        <Image src={"/branding/LogoWordAr.png"} alt='Avatar' width={32} height={24} className='me-6' />
        <div className='flex items-center gap-5'>
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`font-semibold hover:text-violet-main hover:font-bold ${pathname === link.href ? 'text-violet-main' : ''
                }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <div className='flex gap-4'>
        {/* <button className='text-violet-main cursor-pointer' onClick={() => { console.log('notification') }}><Bell size={24} /></button> */}
        <Link href={'/admin/config'} >
          <Button text='Configuración' variant='primary' icon={< Settings size={20} />} iconPosition='right' className='!py-2 text-sm items-center justify-center' />
        </Link>
        <Button text='Cerrar Sesión' variant='secondary' className='!py-2 text-sm items-center justify-center' icon={<LogOut size={20} />} iconPosition='right' onClick={() => { handleLogout() }} />
      </div>
    </header>
  );
};

export default AdminNavbar;
