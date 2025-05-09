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
      className={`md:top-22 w-58 fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] rounded-md border border-violet-main bg-neutral-white2 font-poppins transition-transform duration-300`}
    >
      <nav className='flex flex-col gap-2 px-2 py-4'>
        {
          routes.map(({ title, href, icon }) => (
            <Link
              key={title}
              href={href}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-violet-200'
            >
              {icon}
              <span>{title}</span>
            </Link>
          ))}

        <button
          onClick={handleLogout}
          className='mb-6 mt-auto flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-violet-200'
        >
          <LogOut size={20} />
          <span>Salir</span>
        </button>


      </nav>
    </aside>
  );
};

export default ConfigSidebar;
