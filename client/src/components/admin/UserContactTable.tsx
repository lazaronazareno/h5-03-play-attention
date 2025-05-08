'use client'
import React from 'react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import { ChevronRight, CircleHelp, Coffee, Disc2, Inbox, Mail, MessageCircle } from 'lucide-react';
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import { LeadStatusNames, LeadTypeNames } from '@/constants/LeadNaming';
import EmailForm from './EmailForm';

interface UserContactTableProps {
  type: 'WhatsApp' | 'Correo Electrónico' | 'Reuniones' | 'Campaña' | 'Soporte';
  user: ILeads | IUser
}

//TODO Agregar logica de los checkbox otras paginas que agrege los correos en una lista y se los pase a enviar mails
const UserContactTable = ({ type, user }: UserContactTableProps) => {
  const [openSendEmailForm, setOpenSendEmailForm] = React.useState(false);

  const isLead = (data: ILeads | IUser): data is ILeads => {
    return (data as ILeads).leadType !== undefined;
  };

  return (
    <div className='shadow-main relative rounded-md bg-neutral-white2 px-4 py-6'>
      <div className='flex items-center justify-center gap-2 border-b border-violet-main pb-4'>
        {type === 'Correo Electrónico' && (
          <>
            <Mail size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto'>
              <Button variant='primary' text='Enviar nuevo e-mail' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'WhatsApp' && (
          <>
            <MessageCircle size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              <Button variant='secondary' text='Agregar nuevo WhatsApp' className='items-center justify-center !py-3' />
              <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Reuniones' && (
          <>
            <Coffee size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              <Button variant='secondary' text='Agregar nueva reunión' className='items-center justify-center !py-3' />
              <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Campaña' && (
          <>
            <Disc2 size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              <Button variant='secondary' text='Agregar nueva' className='items-center justify-center !py-3' />
              <Button variant='primary' text='Enviar Campaña' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Soporte' && (
          <>
            <CircleHelp size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              <Button variant='secondary' text='Rechazar' className='items-center justify-center !py-3' />
              <Button variant='primary' text='Enviar respuesta' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
      </div>
      <table className="w-full table-auto border-collapse">
        <thead className='border-y border-violet-main text-start'>
          <tr>
            <th className="p-2 text-start">
              <Inbox size={20} />
            </th>
            <th className="px-4 py-2 text-start">Asunto</th>
            <th className="px-4 py-2 text-start">Fecha</th>
            <th className="px-4 py-2 text-start">Usuario</th>
            <th className="px-4 py-2 text-start">Estado</th>
            <th className="px-4 py-2 text-start">Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {isLead(user) ? (
            <>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">Bienvenido</td>
                <td className="px-4 py-2">2023-10-01</td>
                <td className="px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className="px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className="px-4 py-2">Enviada</td>
              </tr>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">Información sobre el producto | servicio</td>
                <td className="px-4 py-2">2023-10-02</td>
                <td className="px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className="px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className="px-4 py-2">Enviada</td>
              </tr>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">Propuesta enviada</td>
                <td className="px-4 py-2">2023-10-02</td>
                <td className="px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className="px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className="px-4 py-2">Enviada</td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">Bienvenido</td>
                <td className="px-4 py-2">2023-10-01</td>
                <td className="px-4 py-2">asd</td>
                <td className="px-4 py-2">asd</td>
                <td className="px-4 py-2">Enviada</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {openSendEmailForm && (
        <div className='fixed right-0 top-0 z-50 flex h-full w-full justify-end bg-black/50' onClick={() => setOpenSendEmailForm(false)}>
          <div className='shadow-main relative flex flex-col gap-4 rounded-md border border-violet-main bg-neutral-white2' onClick={(e) => e.stopPropagation()}>
            <EmailForm type={type} users={[user.email]} onClick={setOpenSendEmailForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContactTable;
