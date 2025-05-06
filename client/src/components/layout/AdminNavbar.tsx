'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { Bell, LayoutGrid, Settings } from 'lucide-react';
import { ADMIN_LINKS } from '@/constants/adminLinks';
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <header className='z-50 bg-neutral-white2 shadow-main flex items-center justify-between py-3 px-9 text-sm'>
      <div className='flex'>
        <Image src={"/branding/LogoWordAr.png"} alt='Avatar' width={32} height={24} className='me-6' />
        <div className='flex gap-5 items-center'>
          {ADMIN_LINKS.map((link) => (
            <Link key={link.title} href={link.href} className='font-semibold hover:text-violet-main hover:font-bold'>{link.title}</Link>
          ))}
        </div>
      </div>

      <div className='flex gap-4'>
        <button className='text-violet-main cursor-pointer' onClick={() => { console.log('notification') }}><Bell size={24} /></button>
        <Button text='Configuración' variant='primary' icon={< Settings />} iconPosition='right' />
        <button className='text-violet-main cursor-pointer' onClick={() => { console.log('notification') }}><LayoutGrid size={24} /></button>
      </div>
    </header>
  );
};

export default AdminNavbar;