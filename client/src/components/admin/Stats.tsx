import { IUser } from '@/interfaces/IAdmin.interfaces';
import { Airplay, ArrowDown, ArrowUp, UserCheck, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Typography from '../ui/Typography';

interface StatsProps {
  totalClients: number;
  porcentageClients: number;
  totalUsers: number;
  porcentageUsers: number;
  activeUsers: IUser[];
}

interface StatsItemProps {
  icon?: React.ReactNode;
  title: string;
  value: number;
  porcentage?: number;
  images?: string[];
}

const DUMMYIMAGES = [
  '/landing/professionals/test-pro-1.png',
  '/landing/professionals/test-pro-2.png',
  '/landing/professionals/test-pro-3.png',
  '/landing/testimonies/1.png',
  '/landing/testimonies/2.png',
]

const StatsItem = ({ icon, title, value, porcentage, images }: StatsItemProps) => {
  return (
    <div className='flex items-center gap-6'>
      <div className='shadow-main size-24 flex items-center justify-center rounded-full bg-gradient-to-b from-[#A7DBE0] to-[#D7C0F8]'>
        {icon}
      </div>
      <div className='flex flex-col'>
        <h3 className='text-lg font-medium text-gray-400'>{title}</h3>
        <p className='text-2xl font-semibold'>{value}</p>
        {porcentage && (
          <>
            <div className='flex items-center gap-1 text-base'>
              {porcentage > 0 ? (
                <ArrowUp size={20} className='-me-0.5 -mt-1 text-violet-main' />
              ) : (
                <ArrowDown size={20} className='-me-0.5 text-violet-main' />
              )}
              <span className='flex font-semibold text-violet-main'>{porcentage}%</span>
              <p className='text-gray-500'>este mes</p>
            </div>
          </>
        )
        }
        {images && (
          <>
            {images.length > 0 ? (
              <div className='flex'>
                {images.map((image, index) => (
                  <Image key={index} src={image} alt={`Image ${index}`} width={40} height={40} className='size-7' />
                ))}
              </div>
            ) : (
              <div className='ms-3 flex'>
                {DUMMYIMAGES.map((image, index) => (
                  <Image key={index} src={image} alt={`Image ${index}`} width={40} height={40} className='size-7 -ms-2 rounded-full border border-white bg-white' />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const Stats = ({ totalClients, porcentageClients, totalUsers, porcentageUsers, activeUsers }: StatsProps) => {
  return (
    <div className='flex h-min min-h-[527px] min-w-[367px] flex-col items-center justify-center gap-16 rounded-md border-2 border-violet-main bg-neutral-white2 py-12 font-poppins'>
      <Typography variant='p' color='default' size='small-title' text='Métricas' weight='semibold' className='-mb-6 w-full px-16 text-start' />
      <StatsItem icon={<Users size={36} className='text-violet-main' />} title='Total Clientes' value={totalClients} porcentage={porcentageClients} />
      <StatsItem icon={<UserCheck size={36} className='text-violet-main' />} title='Miembros' value={totalUsers} porcentage={porcentageUsers} />
      <StatsItem icon={<Airplay size={36} className='text-violet-main' />} title='Activos ahora' value={activeUsers.length > 0 ? activeUsers.length : 189} images={activeUsers.map(user => user.imageurl!)} />
    </div>
  );
};

export default Stats;
