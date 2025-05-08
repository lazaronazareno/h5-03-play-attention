import { ILeads, ILeadStatus } from '@/interfaces/IAdmin.interfaces';
import { Frown, Home, ShoppingBag, Smile, Star, Users } from 'lucide-react';
import React from 'react';
import { LeadStatusNames } from '@/constants/LeadNaming';
import UserContactTable from './UserContactTable';
import Link from 'next/link';

interface ContactLeadSectionProps {
  status: ILeadStatus;
  lead: ILeads
  setSelectedLead: (lead: ILeads | null) => void;
}

const NAV_ITEMS = [
  { name: 'Cliente Nuevo', icon: <Smile size={20} /> },
  { name: 'Negociación', icon: <Users size={20} /> },
  { name: 'Post-Venta', icon: <ShoppingBag size={20} /> },
  { name: 'Cliente', icon: <Star size={20} /> },
  { name: 'Cliente Cerrado', icon: <Frown size={20} /> },
]

const ContactLeadSection = ({ status, lead, setSelectedLead }: ContactLeadSectionProps) => {
  const statusClasses = {
    NEW: 'bg-pink-lead',
    CONTACTED: 'bg-yellow-lead',
    AFTER_SALES: 'bg-purple-lead',
    CLIENT: 'bg-blue-lead',
    CANCELED: 'bg-gray-lead',
  };
  return (
    <div className={`${statusClasses[status]} py-9 px-4 flex flex-col gap-8 w-full h-[89vh] rounded-md`}>
      <div className='flex'>
        {/* TODO: CAMBIAR PERO FUNCIONA BIEN */}
        <Link href={'/admin/leads'} className='flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main' onClick={() => setSelectedLead(null)}>
          <Home size={20} />
          <span className='text-base font-medium'>Inicio</span>
        </Link>
        {NAV_ITEMS.map((item) => (
          <div key={item.name} className={`flex items-center gap-2 p-4 cursor-pointer hover:text-violet-main ${LeadStatusNames[status] === item.name ? 'text-violet-main' : ''}`}>
            {item.icon}
            <span className={`text-base ${LeadStatusNames[status] === item.name && 'font-semibold'}`}>{item.name}</span>
          </div>
        ))}
      </div>
      <UserContactTable type='Correo Electrónico' user={lead} />
      <UserContactTable type='WhatsApp' user={lead} />
    </div>
  );
};

export default ContactLeadSection;