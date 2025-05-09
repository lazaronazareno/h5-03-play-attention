import React from 'react';
import Typography from '../ui/Typography';
/* import { ChevronDown, Search } from 'lucide-react'; */
import { ILeads, IUser } from '@/interfaces/IAdmin.interfaces';
import UserTable from './UserTable';

interface UserTableSectionProps {
  users: ILeads[] | IUser[];
  setSelectedUser: (user: ILeads | IUser | null) => void;
}

const UserTableSection = ({ users, setSelectedUser }: UserTableSectionProps) => {

  return (
    <div className="max-h-full min-h-[89vh] w-full rounded-md bg-violet-main/20 px-4 py-9">
      <div className="flex h-full flex-col bg-neutral-white2 px-4">
        <div className="flex py-8">
          <Typography variant="h2" color="default" size="2xl" text={"Posibles Clientes"} weight="semibold" />
          {/* TODO: Reemplazar por componente */}
          {/* <div className="flex gap-4 ms-auto">
            <div className="flex items-center gap-2 bg-white border border-violet-main rounded-md p-2">
              <Search size={20} className="text-violet-main" />
              <input
                type="text"
                placeholder="Buscar"
                className="flex-1 bg-transparent text-gray-700 placeholder-violet-main outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-violet-secondary text-white rounded-md p-2">
              <span>Ordenar por: <strong>Nuevos </strong></span>
              <ChevronDown size={20} />
            </div>
          </div>
         */}
        </div>
        <UserTable users={users} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
};

export default UserTableSection;
