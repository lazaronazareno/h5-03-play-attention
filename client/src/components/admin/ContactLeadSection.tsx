import { ILeads, ILeadStatus } from '@/interfaces/IAdmin.interfaces';
import { Frown, Home, ShoppingBag, Smile, Star, Users } from 'lucide-react';
import React, { useState } from 'react';
import UserContactTable from './UserContactTable';
import Link from 'next/link';

interface ContactLeadSectionProps {
  status: ILeadStatus;
  lead: ILeads;
  setSelectedLead: (lead: ILeads | null) => void;
}

const NAV_ITEMS = [
  { name: 'Cliente Nuevo', icon: <Smile size={20} />, status: 'NEW' },
  { name: 'Negociación', icon: <Users size={20} />, status: 'CONTACTED' },
  { name: 'Post-Venta', icon: <ShoppingBag size={20} />, status: 'AFTER_SALES' },
  { name: 'Cliente', icon: <Star size={20} />, status: 'CLIENT' },
  { name: 'Cliente Cerrado', icon: <Frown size={20} />, status: 'CANCELED' },
];

const ContactLeadSection = ({ status: initialStatus, lead, setSelectedLead }: ContactLeadSectionProps) => {
  const [currentStatus, setCurrentStatus] = useState<ILeadStatus>(initialStatus);

  const statusClasses = {
    NEW: 'bg-pink-lead',
    CONTACTED: 'bg-yellow-lead',
    AFTER_SALES: 'bg-purple-lead',
    CLIENT: 'bg-blue-lead',
    CANCELED: 'bg-gray-lead',
  };

  const handleStatusChange = (newStatus: ILeadStatus) => {
    setCurrentStatus(newStatus);
  };

  const handleSendMail = () => {
    // Cambiar el estado al enviar un correo
    setCurrentStatus('CONTACTED');
  };

  const renderContent = () => {
    switch (currentStatus) {
      case 'NEW':
        return <UserContactTable type="Correo Electrónico" user={lead} onChangeStatus={handleSendMail} />;
      case 'CONTACTED':
        return <UserContactTable type="Correo Electrónico" user={lead} onChangeStatus={handleSendMail} />;
      case 'AFTER_SALES':
        return <UserContactTable type="Correo Electrónico" user={lead} onChangeStatus={handleSendMail} />;
      case 'CLIENT':
        return <UserContactTable type="Correo Electrónico" user={lead} onChangeStatus={handleSendMail} />;
      case 'CANCELED':
        return <UserContactTable type="Correo Electrónico" user={lead} onChangeStatus={handleSendMail} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${statusClasses[currentStatus]} py-9 px-4 flex flex-col gap-8 w-full h-[89vh] rounded-md`}>
      <div className="flex">
        <Link
          href={'/admin/leads'}
          className="flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main"
          onClick={() => setSelectedLead(null)}
        >
          <Home size={20} />
          <span className="text-base font-medium">Inicio</span>
        </Link>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 p-4 hover:text-violet-main ${currentStatus === item.status ? 'text-violet-main' : 'cursor-pointer'
              }`}
            onClick={() => handleStatusChange(item.status as ILeadStatus)}
          >
            {item.icon}
            <span className={`text-base ${currentStatus === item.status && 'font-semibold'}`}>{item.name}</span>
          </div>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default ContactLeadSection;