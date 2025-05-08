import { LeadStatusNames, UserStatusNames } from "@/constants/LeadNaming";
import { ILeadStatus, IUserStatus } from "@/interfaces/IAdmin.interfaces";

export const TableStatus = ({ status }: { status: ILeadStatus | IUserStatus }) => {
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