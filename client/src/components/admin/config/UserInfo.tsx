'use client'
import Typography from '@/components/ui/Typography';
import { IUser } from '@/interfaces/IAdmin.interfaces';
import { Pen } from 'lucide-react';
import React from 'react';
import EditUser from './EditUser';

interface UserInfoProps {
  user: IUser
}

const UserInfo = ({ user }: UserInfoProps) => {
  const [openEditForm, setOpenEditForm] = React.useState(false);

  return (
    <div className='bg-white h-full rounded-md p-4 flex flex-col gap-4 relative'>
      <div className='min-w-[400px] w-min'>
        <div className='flex gap-2'>
          <div className='bg-green-300 size-24 rounded-full p-4 flex items-center gap-4' />
          <div className='flex flex-col justify-center'>
            <Typography variant='p' color='default' size='sm' text={(user.name ?? 'Nombre') + ' ' + (user.lastName ?? 'Apellido')} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.userType} weight='semibold' />
          </div>
        </div>

        <div className='flex flex-col gap-2 border-b border-violet-main py-2'>
          <div className='flex justify-between gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Información del usuario'} weight='semibold' />
            <button type='button' onClick={() => setOpenEditForm(true)} >
              <Pen size={20} />
            </button>
          </div>
          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Nombre: '} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.name ?? 'Nombre'} weight='normal' />
          </div>

          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Apellido: '} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.lastName ?? 'Apellido'} weight='normal' />
          </div>

          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Email: '} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.email} weight='normal' />
          </div>

          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Telefono '} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.phoneNumber!} weight='normal' />
          </div>

          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Profesion'} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.profession!} weight='normal' />
          </div>

          <div className='flex gap-2'>
            <Typography variant='p' color='default' size='sm' text={'Institución'} weight='semibold' />
            <Typography variant='p' color='default' size='sm' text={user.institution!} weight='normal' />
          </div>
        </div>
      </div>
      {openEditForm && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50' onClick={() => setOpenEditForm(false)}>
          <EditUser user={user} externalSubmit={() => {
            setOpenEditForm(false)
          }} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;