'use client'

import React from 'react';
import { User, Users } from 'lucide-react';
import { IUser } from '@/interfaces/IAdmin.interfaces';
import dynamic from 'next/dynamic';
const UserInfo = dynamic(() => import('./config/UserInfo'));


const NAV_ITEMS = [
  { name: 'Configuración personal', icon: <User size={20} /> },
  { name: 'Usuarios', icon: <Users size={20} />, },
]

interface UserTabsProps {
  user: IUser
}

const ConfigTabs = ({ user }: UserTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>('Configuración personal');

  const TABS: { [key: string]: (props: UserTabsProps) => React.JSX.Element } = {
    'Configuración personal': () => <UserInfo user={user} />,
    Usuarios: () => <div>Usuarios</div>,

  }
  return (
    <div className='ms-56 mt-2 flex h-[89vh] w-full flex-col gap-8 rounded-md bg-violet-main/30 px-4 py-9'>
      <div className='flex'>
        {NAV_ITEMS.map((item) => (
          <div key={item.name} >
            <button className={`flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main ${activeTab === item.name && 'text-violet-main'}`} onClick={() => setActiveTab(item.name)}>
              {item.icon}
              <span className={`text-base`}>{item.name}</span>
            </button>
          </div>
        ))}
      </div>
      <div className='overflow-y-auto px-4'>
        {TABS[activeTab]({ user })}
      </div>
    </div>
  );
};

export default ConfigTabs;
