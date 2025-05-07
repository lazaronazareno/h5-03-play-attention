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
    <div className='flex gap-6 items-center'>
      <div className='shadow-main flex items-center justify-center size-24 rounded-full bg-gradient-to-b from-[#A7DBE0] to-[#D7C0F8]'>
        {icon}
      </div>
      <div className='flex flex-col'>
        <h3 className='text-lg font-medium text-gray-400'>{title}</h3>
        <p className='text-2xl font-semibold'>{value}</p>
        {porcentage && (
          <>
            {porcentage > 0 ? (
              <div className='flex items-center gap-1 text-base'>
                <ArrowUp size={20} className='text-violet-main -mt-1 -me-0.5' />
                <span className='flex text-violet-main font-semibold'>{porcentage}%</span>
                <p className='text-gray-500'>este mes</p>
              </div>
            ) : (
              <div className='flex items-center gap-1 text-base'>
                <ArrowDown size={20} className='text-yellow-300 -me-0.5' />
                <span className='flex text-yellow-300 font-semibold'>{porcentage}%</span>
                <p className='text-gray-500'>este mes</p>
              </div>
            )}
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
              <div className='flex ms-3'>
                {DUMMYIMAGES.map((image, index) => (
                  <Image key={index} src={image} alt={`Image ${index}`} width={40} height={40} className='border border-white rounded-full bg-white size-7 -ms-2' />
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
    <div className='bg-neutral-white2 border border-violet-main rounded-md flex flex-col justify-center items-center gap-16 min-w-[367px] min-h-[527px] h-min py-12 font-poppins'>
      <Typography variant='p' color='default' size='small-title' text='Métricas' weight='semibold' className='text-start' />
      <StatsItem icon={<Users size={36} className='text-violet-main' />} title='Total Clientes' value={totalClients} porcentage={porcentageClients} />
      <StatsItem icon={<UserCheck size={36} className='text-violet-main' />} title='Miembros' value={totalUsers} porcentage={porcentageUsers} />
      <StatsItem icon={<Airplay size={36} className='text-violet-main' />} title='Activos ahora' value={activeUsers.length > 0 ? activeUsers.length : 189} images={activeUsers.map(user => user.imageurl!)} />
    </div>
  );
};

export default Stats;