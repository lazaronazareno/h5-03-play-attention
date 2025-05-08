'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Book, BookOpenIcon, Calendar, CircleHelp, Disc2, Home, Layers, LayoutGrid, Smartphone, Star, TrendingUp, Video } from 'lucide-react';
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import { deleteContentById } from '@/services/admin/deleteContent';
import { getContentByType } from '@/services/admin/getContent';
const ContactUserSection = dynamic(() => import('./ContactUserSection'));
const UserContactTable = dynamic(() => import('../UserContactTable'));
const UserActivitiesSection = dynamic(() => import('./UserActivitiesSection'));


const NAV_ITEMS = [
  {
    name: 'Inicio', icon: <Home size={20} />
  },
  { name: 'Cronologia', icon: <TrendingUp size={20} /> },
  { name: 'Contacto', icon: <Smartphone size={20} />, },
  { name: 'Campaña', icon: <Disc2 size={20} /> },
  { name: 'Soporte', icon: <CircleHelp size={20} /> },
  { name: 'Actividades', icon: <LayoutGrid size={20} /> },
  { name: 'Archivos', icon: <Layers size={20} /> },
  { name: 'Videos', icon: <Video size={20} /> },
  { name: 'Eventos y Notificaciones', icon: <Calendar size={20} /> },
]

interface UserTabsProps {
  user: IUser | ILeads
  setSelectedUser?: (user: IUser | ILeads | null) => void;
}

const UserTabs = ({ user, setSelectedUser }: UserTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>('Cronologia');

  const TABS: { [key: string]: (props: UserTabsProps) => React.JSX.Element } = {
    Inicio: () => <div>Inicio</div>,
    Cronologia: () => <div>Cronologia</div>,
    Contacto: () => <ContactUserSection user={user as IUser} />,
    Campaña: () => <UserContactTable type='Campaña' user={user} />,
    Soporte: () => <UserContactTable type='Soporte' user={user} />,
    Actividades: () => <UserActivitiesSection
      title='Actividades'
      icon={<LayoutGrid size={24} className='text-violet-main ms-4' />}
      deleteItemById={deleteContentById}
      fetchItems={() => getContentByType('ACTIVITY')}
      type='ACTIVITY'
    />,
    Archivos: () => <div className='flex flex-col gap-4'>
      <UserActivitiesSection
        title='Material Educativo'
        icon={<BookOpenIcon size={24} className='text-violet-main ms-4' />}
        deleteItemById={deleteContentById}
        fetchItems={() => getContentByType('DOCUMENT')}
        type='DOCUMENT'
      />
      <UserActivitiesSection
        title='Articulos Medicos'
        icon={<Book size={24} className='text-violet-main ms-4' />}
        deleteItemById={deleteContentById}
        fetchItems={() => getContentByType('ARTICLE')}
        type='ARTICLE'
      />
      <UserActivitiesSection
        title='Marketing'
        icon={<Star size={24} className='text-violet-main ms-4' />}
        deleteItemById={deleteContentById}
        fetchItems={() => getContentByType('MARKETING')}
        type='MARKETING'
      />
    </div>,
    Videos: () => <UserActivitiesSection
      title='Tutoriales'
      icon={<Video size={24} className='text-violet-main ms-4' />}
      deleteItemById={deleteContentById}
      fetchItems={() => getContentByType('VIDEO')}
      type='VIDEO'
    />,
    'Eventos y Notificaciones': () => <div>Eventos y Notificaciones</div>
  }
  return (
    <div className='bg-violet-main/30 py-9 px-4 flex flex-col gap-8 w-full h-[89vh] rounded-md'>
      <div className='flex justify-between'>
        {NAV_ITEMS.map((item) => (
          <>
            {item.name === 'Inicio' ? (
              <button key={item.name} className={`flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main ${activeTab === item.name && 'text-violet-main'}`} onClick={() => setSelectedUser!(null)}>
                {item.icon}
                <span className={`text-base `}>{item.name}</span>
              </button>
            ) : (

              <button key={item.name} className={`flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main ${activeTab === item.name && 'text-violet-main'}`} onClick={() => setActiveTab(item.name)}>
                {item.icon}
                <span className={`text-base `}>{item.name}</span>
              </button>
            )}
          </>

        ))}
      </div>
      <div className='overflow-y-auto'>
        {TABS[activeTab]({ user })}
      </div>
    </div>
  );
};

export default UserTabs;