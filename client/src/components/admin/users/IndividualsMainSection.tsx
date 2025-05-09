'use client'
import React from 'react';
import Stats from '../Stats';
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import UserCard from '../LeadCard';
import UserTableSection from '../LeadsTableSection';
import UserTabs from './UserTabs';

interface UsersMainSectionProps {
  users: IUser[];
  totalClients: number;
  porcentageClients: number;
  totalUsers: number;
  porcentageUsers: number;
}


const UsersMainSection = ({ users, totalClients, porcentageClients, porcentageUsers, totalUsers }: UsersMainSectionProps) => {
  const [selectedUser, setSelectedUser] = React.useState<ILeads | IUser | null>(null);

  return (
    <div className="flex gap-2 ">
      <div className={`flex justify-center px-4 w-1/4`}>
        {selectedUser ? (
          <UserCard data={selectedUser} />
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
      {selectedUser ? (
        <UserTabs user={selectedUser as IUser} setSelectedUser={setSelectedUser} />
      ) : (
        <UserTableSection users={users} setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
};

export default UsersMainSection;
