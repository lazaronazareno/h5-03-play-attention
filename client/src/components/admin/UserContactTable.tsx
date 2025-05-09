'use client'
import React from 'react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import { ChevronRight, CircleHelp, Coffee, Disc2, Eye, Inbox, Mail, MessageCircle } from 'lucide-react';
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import { LeadStatusNames, LeadTypeNames } from '@/constants/LeadNaming';
import EmailForm from './EmailForm';
import { getMailsById } from '@/services/mail/getMails';
import { IEmailResponse } from '@/interfaces/IMails.interface';
import { fakeSupportTickets } from '@/constants/fakeSupportTickets';
import { ISupportTicket } from '@/interfaces/ISupport-interface';

interface UserContactTableProps {
  type: 'WhatsApp' | 'Correo Electrónico' | 'Reuniones' | 'Campaña' | 'Soporte';
  user: ILeads | IUser
  onChangeStatus?: (status: string) => void;
}

//TODO Agregar logica de los checkbox otras paginas que agrege los correos en una lista y se los pase a enviar mails
const UserContactTable = ({ type, user, onChangeStatus }: UserContactTableProps) => {
  const [openSendEmailForm, setOpenSendEmailForm] = React.useState(false);
  const [messages, setMessages] = React.useState<IEmailResponse[] | null>(null);
  //TODO: Cambiar para que pueda seleccionar más de un mensaje
  const [selectedMessage, setSelectedMessage] = React.useState<IEmailResponse | null>(null);
  const [isOpenMessage, setIsOpenMessage] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<ISupportTicket | null>(null);

  const isLead = (data: ILeads | IUser): data is ILeads => {
    return (data as ILeads).leadType !== undefined;
  };

  const handleActionByType = async (userId: number) => {
    let response: IEmailResponse[] | null = null
    if (type === 'Correo Electrónico') {
      response = await getMailsById(userId);
    } else if (type === 'WhatsApp') {
      //logica para consultar mensajes de whatsapp

    } else if (type === 'Reuniones') {
      //logica para consultar reuniones

    } else if (type === 'Campaña') {
      //logica para consultar mails de campañas

    } else if (type === 'Soporte') {
      //logica para consultar soportes
    }
    console.log('Response:', response);
    return response
  };

  React.useEffect(() => {
    const fetchMessages = async () => {
      const result = await handleActionByType(Number(user.id));
      console.log('Result:', result);
      setMessages(result);
    };
    if (isLead(user)) {
      fetchMessages();
    }
  }, [type, user]);

  return (
    <div className='shadow-main relative rounded-md bg-neutral-white2 px-4 py-6'>
      <div className='flex items-center justify-center gap-2 border-b border-violet-main pb-4'>
        {type === 'Correo Electrónico' && (
          <>
            <Mail size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              {selectedMessage && (
                <Button variant='secondary' text='Ver Contenido' className='!py-3 items-center justify-center' icon={<Eye size={20} />} iconPosition='right' onClick={() => setIsOpenMessage(true)} />
              )}
              <Button variant='primary' text='Enviar nuevo e-mail' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'WhatsApp' && (
          <>
            <MessageCircle size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='flex gap-2 ms-auto'>
              {/*               <Button variant='secondary' text='Agregar nuevo WhatsApp' className='!py-3 items-center justify-center' />
 */}              <a
                href={`https://wa.me/${user.phoneNumber}?text=Hola, ${user.name} ${user.lastName}! Nos comunicamos desde Play Attention para...`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='!py-3 items-center justify-center' />
              </a>
            </div>
          </>
        )}
        {type === 'Reuniones' && (
          <>
            <Coffee size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              {/* <Button variant='secondary' text='Agregar nueva reunión' className='items-center justify-center !py-3' /> */}
              <Button variant='primary' text='Enviar nuevo mensaje' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Campaña' && (
          <>
            <Disc2 size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              {/* <Button variant='secondary' text='Agregar nueva' className='items-center justify-center !py-3' /> */}
              <Button variant='primary' text='Enviar Campaña' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
            </div>
          </>
        )}
        {type === 'Soporte' && (
          <>
            <CircleHelp size={24} className='ms-4 text-violet-main' />
            <Typography variant='h2' text={type} weight='bold' size='small-title' color='violet' />
            <div className='ms-auto flex gap-2'>
              {/* <Button variant='secondary' text='Rechazar' className='items-center justify-center !py-3' /> */}
              {selectedTicket && (
                <Button variant='primary' text='Enviar respuesta' icon={<ChevronRight size={20} color='white' />} iconPosition='right' className='items-center justify-center !py-3' onClick={() => setOpenSendEmailForm(true)} />
              )}
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
              {messages && messages.map((message) => (
                <tr key={message.id}>
                  <td className="px-3">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedMessage(e.target.checked ? message : null)
                      }}
                      checked={selectedMessage?.id === message.id}
                    />
                  </td>
                  <td className=" px-4 py-2">{message.subject}</td>
                  <td>{new Date(message.sendDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td className=" px-4 py-2">{LeadTypeNames[user.leadType]}</td>
                  <td className=" px-4 py-2">{LeadStatusNames[user.status]}</td>
                  <td className=" px-4 py-2">Enviada</td>
                </tr>
              ))}
              {!messages || messages.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">No hay mensajes disponibles en este momento</td>
                </tr>
              )}
            </>
          ) : (
            <>
              {type === 'Soporte' ? (
                <>
                  {fakeSupportTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td className="px-3">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setSelectedTicket(e.target.checked ? ticket : null)
                          }}
                          checked={selectedTicket?.id === ticket.id}
                        />
                      </td>
                      <td className="px-4 py-2">{ticket.subject}</td>
                      <td className="px-4 py-2">{ticket.date}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{ticket.status}</td>
                      <td className="px-4 py-2">{ticket.response}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td className="px-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">Bienvenido</td>
                  <td className="px-4 py-2">2025-05-05</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">Pendiente</td>
                  <td className="px-4 py-2">PENDIENTE</td>
                </tr>

              )}
            </>
          )}
        </tbody>
      </table>
      {openSendEmailForm && (
        <div className='fixed top-0 right-0 w-full h-full bg-black/50 flex justify-end z-50' onClick={() => setOpenSendEmailForm(false)}>
          <div className='relative flex flex-col gap-4 bg-neutral-white2 border border-violet-main rounded-md shadow-main' onClick={(e) => e.stopPropagation()}>
            <EmailForm type={type} users={[selectedTicket ? selectedTicket.user : user.email]} onClick={setOpenSendEmailForm} onChangeStatus={onChangeStatus} />
          </div>
        </div>
      )}
      {isOpenMessage && (
        <div className='fixed top-0 right-1/2 translate-x-1/2 w-full h-full bg-black/50 flex justify-center items-center z-50' onClick={() => setIsOpenMessage(false)}>
          <div className='relative flex flex-col gap-4 bg-neutral-white2 border border-violet-main rounded-md shadow-main py-4' onClick={(e) => e.stopPropagation()}>
            <p>{selectedMessage?.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContactTable;
