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
    <div className='shadow-main h-full w-[1248px]'>
      <div className='flex h-full w-full flex-col border-b border-violet-main bg-violet-main/10'>
        <div className='flex items-center gap-2 py-4'>
          {type === 'Correo Electrónico' && (
            <>
              <Mail size={24} className='ms-4 text-violet-main' />
              <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />

            </>
          )}
          {type === 'WhatsApp' && (
            <>
              <MessageCircle size={24} className='ms-4 text-violet-main' />
              <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            </>
          )}
          <div className='ms-auto flex gap-2'>
            <Maximize2 size={24} className='cursor-pointer text-violet-main' />
            <Minus size={24} className='cursor-pointer text-violet-main' />
            <X size={24} className='cursor-pointer text-violet-main' onClick={() => onClick!(false)} />
          </div>
        </div>
        <div className='flex gap-2 border-b border-violet-main bg-white p-4'>
          <span className='font-poppins text-violet-main'>De: </span>
          <Button variant='primary' text={'Play Attention Argentina'} className='items-center justify-center !py-0 font-semibold' />
        </div>
        <div className='flex gap-2 border-b border-violet-main bg-white p-4'>
          <span className='font-poppins text-violet-main'>Para: </span>
          {users.map((user, index) => (
            <Button key={index} variant='primary' text={user} className='items-center justify-center !py-0 font-semibold' />
          ))}
        </div>
        <div className='flex gap-2 border-b border-violet-main bg-white p-4'>
          <span className='font-poppins text-violet-main'>Asunto: </span>
          <input type="text" />
        </div>
        <div className='flex h-full flex-1 bg-neutral-white2'>
          {/* TODO: Agregar un editor de texto */}
          <textarea className='w-full rounded-md p-4' placeholder='Escribe tu mensaje aquí...'></textarea>
        </div>
        <div className='mt-auto flex gap-2 bg-white p-4'>
          <Button variant='primary' text='Enviar' className='items-center justify-center !py-0 font-semibold' />
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
