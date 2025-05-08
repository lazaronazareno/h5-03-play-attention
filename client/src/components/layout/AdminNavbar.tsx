'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { Bell, LayoutGrid, Settings } from 'lucide-react';
import { ADMIN_LINKS } from '@/constants/adminLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNavbar = () => {
  const pathname = usePathname();

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
        <button className='cursor-pointer text-violet-main' onClick={() => { console.log('notification') }}><Bell size={24} /></button>
        <Link href={'/admin/config'} >
          <Button text='Configuración' variant='primary' icon={< Settings />} iconPosition='right' />
        </Link>
        <button className='cursor-pointer text-violet-main' onClick={() => { console.log('notification') }}><LayoutGrid size={24} /></button>
      </div>
    </header>
  );
};

export default AdminNavbar;
