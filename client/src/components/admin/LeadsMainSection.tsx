'use client'
import React from 'react';
import Stats from './Stats';
import ContactLeadSection from './ContactLeadSection';
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import UserCard from './LeadCard';
import UserTableSection from './LeadsTableSection';

interface LeadsMainSectionProps {
  leads: ILeads[];
  totalClients: number;
  porcentageClients: number;
  totalUsers: number;
  porcentageUsers: number;
}

const LeadsMainSection = ({ leads, totalClients, porcentageClients, porcentageUsers, totalUsers }: LeadsMainSectionProps) => {
  const [selectedLead, setSelectedLead] = React.useState<ILeads | IUser | null>(null);

  return (
    <div className="flex">
      <div className={`flex justify-center px-4`}>
        {selectedLead ? (
          <UserCard data={selectedLead} />
        ) : (
          <Stats
            totalClients={totalClients}
            porcentageClients={porcentageClients}
            totalUsers={totalUsers}
            porcentageUsers={porcentageUsers}
            activeUsers={[]}
          />
        )}
      </div>
      {selectedLead ? (
        <ContactLeadSection lead={selectedLead as ILeads} setSelectedLead={setSelectedLead} status={(selectedLead as ILeads).status} />
      ) : (
        <UserTableSection users={leads} setSelectedUser={setSelectedLead} />
      )}
    </div>
  );
};

export default LeadsMainSection;
