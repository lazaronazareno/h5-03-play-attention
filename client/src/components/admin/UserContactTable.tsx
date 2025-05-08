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
    <div className='relative bg-neutral-white2 px-4 py-6 rounded-md shadow-main'>
      <div className='flex justify-center items-center gap-2 pb-4 border-b border-violet-main'>
        {type === 'Correo Electrónico' && (
          <>
            <Mail size={24} className='text-violet-main ms-4' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto'>
              <Button variant='primary' text='Enviar nuevo e-mail' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'WhatsApp' && (
          <>
            <MessageCircle size={24} className='text-violet-main ms-4' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              <Button variant='secondary' text='Agregar nuevo WhatsApp' className='!py-3 items-center justify-center' />
              <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Reuniones' && (
          <>
            <Coffee size={24} className='text-violet-main ms-4' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              <Button variant='secondary' text='Agregar nueva reunión' className='!py-3 items-center justify-center' />
              <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Campaña' && (
          <>
            <Disc2 size={24} className='text-violet-main ms-4' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              <Button variant='secondary' text='Agregar nueva' className='!py-3 items-center justify-center' />
              <Button variant='primary' text='Enviar Campaña' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Soporte' && (
          <>
            <CircleHelp size={24} className='text-violet-main ms-4' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              <Button variant='secondary' text='Rechazar' className='!py-3 items-center justify-center' />
              <Button variant='primary' text='Enviar respuesta' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
      </div>
      <table className="table-auto w-full border-collapse">
        <thead className='border-y border-violet-main text-start'>
          <tr>
            <th className="text-start p-2">
              <Inbox size={20} />
            </th>
            <th className="text-start px-4 py-2">Asunto</th>
            <th className="text-start px-4 py-2">Fecha</th>
            <th className="text-start px-4 py-2">Usuario</th>
            <th className="text-start px-4 py-2">Estado</th>
            <th className="text-start px-4 py-2">Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {isLead(user) ? (
            <>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className=" px-4 py-2">Bienvenido</td>
                <td className=" px-4 py-2">2023-10-01</td>
                <td className=" px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className=" px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className=" px-4 py-2">Enviada</td>
              </tr>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className=" px-4 py-2">Información sobre el producto | servicio</td>
                <td className=" px-4 py-2">2023-10-02</td>
                <td className=" px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className=" px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className=" px-4 py-2">Enviada</td>
              </tr>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className=" px-4 py-2">Propuesta enviada</td>
                <td className=" px-4 py-2">2023-10-02</td>
                <td className=" px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                <td className=" px-4 py-2">{LeadStatusNames[user.status]}</td>
                <td className=" px-4 py-2">Enviada</td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td className="px-3">
                  <input type="checkbox" />
                </td>
                <td className=" px-4 py-2">Bienvenido</td>
                <td className=" px-4 py-2">2023-10-01</td>
                <td className=" px-4 py-2">asd</td>
                <td className=" px-4 py-2">asd</td>
                <td className=" px-4 py-2">Enviada</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {openSendEmailForm && (
        <div className='fixed top-0 right-0 w-full h-full bg-black/50 flex justify-end z-50' onClick={() => setOpenSendEmailForm(false)}>
          <div className='relative flex flex-col gap-4 bg-neutral-white2 border border-violet-main rounded-md shadow-main' onClick={(e) => e.stopPropagation()}>
            <EmailForm type={type} users={[user.email]} onClick={setOpenSendEmailForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContactTable;