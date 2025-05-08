"use client"
import { LeadStatusNames, UserStatusNames } from '@/constants/LeadNaming';
import { ILeads, ILeadStatus, IUser, IUserStatus } from '@/interfaces/IAdmin.interfaces';
import { ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import React from 'react';

interface UserTableProps {
  users: ILeads[] | IUser[]
  setSelectedUser: (user: ILeads | IUser) => void
}

const TABLE_HEAD = [
  "Nombre",
  "Categoría",
  "Teléfono",
  "Correo Electrónico",
  "País",
  "Estado",
  "Editar"
]

const TableHead = ({ title }: { title: string }) => {
  return (
    <th className={`p-4 font-medium ${(title === 'Estado' || title === 'Editar') ? 'text-center' : 'text-start'}`}>{title}</th>
  );
}

const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <td className={`p-4 border-b border-gray-200/30 ${className ?? className}`}>{children}</td>
  );
}

const TableStatus = ({ status }: { status: ILeadStatus | IUserStatus }) => {
  const statusClasses = {
    NEW: 'bg-pink-lead',
    CONTACTED: 'bg-yellow-lead',
    AFTER_SALES: 'bg-purple-lead',
    CLIENT: 'bg-blue-lead',
    CANCELED: 'bg-gray-lead',
    ACTIVE: 'bg-violet-main text-white',
    INACTIVE: 'bg-neutral-white2 text-violet-main border border-violet-main',
  }

  return (
    <span className={`font-semibold capitalize flex justify-center rounded-md w-full ${statusClasses[status]}`}>
      {status === 'ACTIVE' || status === 'INACTIVE' ? UserStatusNames[status] : LeadStatusNames[status]}
    </span>
  );
}

const UserTable = ({ users, setSelectedUser }: UserTableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const leadsPerPage = 8;

  const totalPages = React.useMemo(() => {
    return Math.ceil(users.length / leadsPerPage) || 1;
  }, [users]);

  const currentUsers = React.useMemo(() => {
    const start = (currentPage - 1) * leadsPerPage;
    const end = start + leadsPerPage;
    return users.slice(start, end);
  }, [users, currentPage]);

  return (
    <div className='flex flex-col h-full'>
      <div className="overflow-hidden border bg-white border-violet-main rounded-md w-full py-1">
        <table className="table-auto border-collapse font-poppins w-full">
          <thead>
            <tr className="border-b border-gray-200/30">
              {TABLE_HEAD.map((title) => (
                <TableHead key={title} title={title} />
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                {('leadType' in user) ? (
                  <>
                    <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                    <TableCell>{user.leadType}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>
                      <TableStatus status={user.status} />
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Pen size={20} />
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                    <TableCell>{user.userType}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>
                      <TableStatus status={'ACTIVE'} />
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Pen size={20} />
                      </div>
                    </TableCell>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex py-4 pt-6 mt-auto items-center">
        <span className="text-gray-400 font-poppins">
          Mostrando página {currentPage} de {totalPages}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {totalPages >= 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
              >
                <ChevronLeft size={20} className="text-violet-main" />
              </button>

              {/* Botones de página */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md ${currentPage === index + 1
                    ? 'bg-violet-main text-white'
                    : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
              >
                <ChevronRight size={20} className="text-violet-main" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;