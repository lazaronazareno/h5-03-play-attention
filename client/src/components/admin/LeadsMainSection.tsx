'use client'
import React from 'react';
import LeadCard from './LeadCard';
import Stats from './Stats';
import ContactLeadSection from './ContactLeadSection';
import LeadsTableSection from './LeadsTableSection';
import { ILeads } from '@/interfaces/IAdmin.interfaces';

interface LeadsMainSectionProps {
  leads: ILeads[];
  totalClients: number;
  porcentageClients: number;
  totalUsers: number;
  porcentageUsers: number;
}

const LeadsMainSection = ({ leads, totalClients, porcentageClients, porcentageUsers, totalUsers }: LeadsMainSectionProps) => {
  const [selectedLead, setSelectedLead] = React.useState<ILeads | null>(null);

  return (
    <div className="flex">
      <div className={`flex justify-center px-4`}>
        {selectedLead ? (
          <LeadCard {...selectedLead} />
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
        <ContactLeadSection lead={selectedLead} setSelectedLead={setSelectedLead} status={selectedLead.status} />
      ) : (
        <LeadsTableSection leads={leads} setSelectedLead={setSelectedLead} />
      )}
    </div>
  );
};

export default LeadsMainSection;