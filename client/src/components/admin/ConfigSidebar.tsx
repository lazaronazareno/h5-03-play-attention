'use client'
import React from 'react';
import { deleteUserCookie } from "@/services/auth/logout";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ConfigSidebar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await deleteUserCookie()
    router.push('/')
  }

  const routes = [
    { title: 'General', href: '/admin/config', icon: <User size={20} /> },
  ]
  return (
    <aside
      className={`
        fixed top-16 left-0 font-poppins md:top-22 w-58 h-[calc(100vh-4rem)] bg-neutral-white2 border border-violet-main rounded-md z-40 transition-transform duration-300
      `}
    >
      <nav className='flex flex-col gap-2 px-2 py-4'>
        {
          routes.map(({ title, href, icon }) => (
            <Link
              key={title}
              href={href}
              className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-violet-200 text-sm'
            >
              {icon}
              <span>{title}</span>
            </Link>
          ))}

        <button
          onClick={handleLogout}
          className='mt-auto mb-6 cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md hover:bg-violet-200 text-sm'
        >
          <LogOut size={20} />
          <span>Salir</span>
        </button>


      </nav>
    </aside>
  );
};

export default ConfigSidebar;