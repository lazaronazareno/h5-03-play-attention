"use client"
import { ILeads, ILeadStatus } from '@/interfaces/IAdmin.interfaces';
import { ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import React from 'react';

interface LeadsTableProps {
  leads: ILeads[]
  totalPages: number
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

const TableStatus = ({ status }: { status: ILeadStatus }) => {
  const statusClasses = {
    NEW: 'bg-yellow-500',
    CONTACTED: 'bg-purple-500',
    AFTER_SALES: 'bg-violet-main',
    CLIENT: 'bg-gray-500',
    CANCELED: 'bg-black',
  }

  const statusText = {
    NEW: 'Nuevo',
    CONTACTED: 'Negociación',
    AFTER_SALES: 'Post Venta',
    CLIENT: 'Cliente',
    CANCELED: 'Anulado',
  }

  return (
    <span className={`font-semibold text-white uppercase flex justify-center rounded-md w-full ${statusClasses[status]}`}>{statusText[status]}</span>
  );
}

const LeadsTable = ({ leads, totalPages }: LeadsTableProps) => {
  const [page, setPage] = React.useState(1);
  return (
    <div>

      <div className='overflow-hidden border border-violet-main rounded-md w-full py-1'>
        <table className="table-auto border-collapse font-poppins w-full">
          <thead>
            <tr className='border-b border-gray-200/30'>
              {TABLE_HEAD.map((title) => (
                <TableHead key={title} title={title} />
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.leadType}</TableCell>
                <TableCell>{lead.phoneNumber}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.country}</TableCell>
                <TableCell>
                  <TableStatus status={lead.status} />
                </TableCell>
                <TableCell>
                  <div className='flex justify-center'>
                    <Pen size={20} />
                  </div>

                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex py-4 pt-6 mt-auto'>
        <span className='text-gray-400 font-poppins'>Mostrando {page} de {totalPages} páginas</span>
        <div className="ml-auto flex items-center gap-2">
          {totalPages > 1 && (
            <>
              {page > 1 && <button type='button' onClick={() => setPage(page - 1)}><ChevronLeft size={20} className='text-violet-main' /></button>}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 ${page === index + 1 ? 'bg-violet-main text-white' : 'hover:bg-gray-300'} rounded-md`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              {page < totalPages && (
                <button type='button' onClick={() => setPage(page + 1)}><ChevronRight size={20} className='text-violet-main' /></button>
              )}
            </>
          )}
        </div>
      </div>
    </div>

  );
};

export default LeadsTable;