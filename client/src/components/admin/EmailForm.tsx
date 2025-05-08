import { Mail, Maximize2, MessageCircle, Minus, X } from 'lucide-react';
import React from 'react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import DropdownLead from '../ui/DropdownLead';
import { LeadStatusNames, LeadTypeNames } from '@/constants/LeadNaming';

interface EmailFormProps {
  users: string[];
  from?: string;
  type: 'WhatsApp' | 'Correo Electrónico' | 'Reuniones' | 'Campaña' | 'Soporte';
  onClick?: (value: boolean) => void;
}

const EmailForm = ({ users, type, onClick }: EmailFormProps) => {
  return (
    <div className='w-[1248px] h-full shadow-main'>
      <div className='h-full flex flex-col w-full border-b border-violet-main bg-violet-main/10'>
        <div className='flex py-4 items-center gap-2'>
          {type === 'Correo Electrónico' && (
            <>
              <Mail size={24} className='text-violet-main ms-4' />
              <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />

            </>
          )}
          {type === 'WhatsApp' && (
            <>
              <MessageCircle size={24} className='text-violet-main ms-4' />
              <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            </>
          )}
          <div className='flex ms-auto gap-2'>
            <Maximize2 size={24} className='text-violet-main cursor-pointer' />
            <Minus size={24} className='text-violet-main cursor-pointer' />
            <X size={24} className='text-violet-main cursor-pointer' onClick={() => onClick!(false)} />
          </div>
        </div>
        <div className='bg-white border-b border-violet-main flex p-4 gap-2'>
          <span className='text-violet-main font-poppins'>De: </span>
          <Button variant='primary' text={'Play Attention Argentina'} className='!py-0 items-center justify-center font-semibold' />
        </div>
        <div className='bg-white border-b border-violet-main flex p-4 gap-2'>
          <span className='text-violet-main font-poppins'>Para: </span>
          {users.map((user, index) => (
            <Button key={index} variant='primary' text={user} className='!py-0 items-center justify-center font-semibold' />
          ))}
        </div>
        <div className='bg-white border-b border-violet-main flex p-4 gap-2'>
          <span className='text-violet-main font-poppins'>Asunto: </span>
          <input type="text" />
        </div>
        <div className='bg-neutral-white2 flex flex-1 h-full'>
          {/* TODO: Agregar un editor de texto */}
          <textarea className='w-full rounded-md p-4' placeholder='Escribe tu mensaje aquí...'></textarea>
        </div>
        <div className='flex gap-2 bg-white p-4 mt-auto'>
          <Button variant='primary' text='Enviar' className='!py-0 items-center justify-center font-semibold' />
          <DropdownLead
            title='Estado'
            options={Object.values(LeadStatusNames)}
            selectedOption={'Estado'}
            onSelect={(option) => console.log(option)}
            background='bg-violet-main text-white'
          />
          <DropdownLead
            title='Usuario'
            options={Object.values(LeadTypeNames)}
            selectedOption={'Usuario'}
            onSelect={(option) => console.log(option)}
            background='bg-violet-main text-white'
          />
        </div>
      </div>
    </div>
  );
};

export default EmailForm;