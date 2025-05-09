'use client'

import React from 'react';
import { User } from 'lucide-react';
import { IUser } from '@/interfaces/IAdmin.interfaces';
import dynamic from 'next/dynamic';
const UserInfo = dynamic(() => import('./config/UserInfo'));


const NAV_ITEMS = [
  { name: 'Configuración personal', icon: <User size={20} /> },
]

interface UserTabsProps {
  user: IUser
}

const ConfigTabs = ({ user }: UserTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>('Configuración personal');

  const TABS: { [key: string]: (props: UserTabsProps) => React.JSX.Element } = {
    'Configuración personal': () => <UserInfo user={user} />,

  }
  return (
    <div className='ms-56 mt-2 bg-violet-main/30 py-9 px-4 flex flex-col gap-8 w-full h-[89vh] rounded-md'>
      <div className='flex'>
        {NAV_ITEMS.map((item) => (
          <div key={item.name} >
            <button className={`flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main ${activeTab === item.name && 'text-violet-main'}`} onClick={() => setActiveTab(item.name)}>
              {item.icon}
              <span className={`text-base `}>{item.name}</span>
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