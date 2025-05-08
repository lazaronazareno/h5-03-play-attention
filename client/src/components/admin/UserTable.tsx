"use client"
import { ILeads, IUser, } from '@/interfaces/IAdmin.interfaces';
import { ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import React from 'react';
import { TableHead } from './TableHead';
import { TableCell } from './TableCell';
import { TableStatus } from './TableStatus';

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
    <div className='flex h-full flex-col'>
      <div className="w-full overflow-hidden rounded-md border border-violet-main bg-white py-1">
        <table className="w-full table-auto border-collapse font-poppins">
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
                        className="flex cursor-pointer justify-center"
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
                        className="flex cursor-pointer justify-center"
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
      <div className="mt-auto flex items-center py-4 pt-6">
        <span className="font-poppins text-gray-400">
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
