import { TableCell } from "@/components/admin/TableCell";
import { TableHead } from "@/components/admin/TableHead";
import { TableStatus } from "@/components/admin/TableStatus";
import Typography from "@/components/ui/Typography";
import { ILeads, IUser } from "@/interfaces/IAdmin.interfaces";
import { getLatestLeads } from "@/services/admin/getLeads";
import { getUserData } from "@/services/admin/getToken";
import { getUsers } from "@/services/admin/getUsers";
import Link from "next/link";

export default async function AdminPage() {
  const user: IUser = await getUserData();
  const leads: ILeads[] = await getLatestLeads()
  const latestLeads = leads.slice(0, 3)
  const users: IUser[] = await getUsers()
  const latestUsers = users.slice(0, 2)

  return (
    <div className="flex h-full flex-col gap-4 bg-violet-secondary/30 p-6">
      <div className="flex py-4">
        <Typography variant="h2" color="default" size="subtitle" text={"Bienvenido " + user.name + " " + user.lastName} weight="medium" />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex h-[350px] min-w-[550px] flex-col">
          <div className="flex items-center justify-between pb-2">
            <Typography variant="h2" color="green" size="sm" text={"Potenciales Clientes"} weight="semibold" />
            <Link href="/admin/leads" className="flex cursor-pointer items-center gap-2 rounded-md bg-green-300 p-2 text-white transition-all duration-200 ease-in-out hover:bg-green-main">
              Ver más
            </Link>
          </div>

          <div className="h-full overflow-y-auto rounded-md border-2 border-violet-main bg-white p-4">
            <table className="w-full table-auto border-collapse font-poppins">
              <thead>
                <tr className="border-b border-gray-200/30">
                  {['Nombre', 'Usuario', 'Estado'].map((title) => (
                    <TableHead key={title} title={title} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {latestLeads.map((user) => (
                  <tr key={user.id}>
                    <>
                      <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                      <TableCell>{user.leadType}</TableCell>
                      <TableCell>
                        <TableStatus status={user.status} />
                      </TableCell>

                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex h-[350px] min-w-[550px] flex-col">
          <div className="flex items-center justify-between pb-2">
            <Typography variant="h2" color="green" size="sm" text={"Ultimos Clientes"} weight="semibold" />
            <Link href="/admin/leads" className="ursor-pointer flex items-center gap-2 rounded-md bg-green-300 p-2 text-white transition-all duration-200 ease-in-out hover:bg-green-main">
              Ver más
            </Link>
          </div>

          <div className="h-full overflow-y-auto rounded-md border-2 border-violet-main bg-white p-4">
            <table className="w-full table-auto border-collapse font-poppins">
              <thead>
                <tr className="border-b border-gray-200/30">
                  {['Nombre', 'Usuario', 'Estado'].map((title) => (
                    <TableHead key={title} title={title} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {latestUsers.map((user) => (
                  <tr key={user.id}>
                    <>
                      <TableCell>{user.name + ' ' + user.lastName}</TableCell>
                      <TableCell>{user.userType}</TableCell>
                      <TableCell>
                        <TableStatus status={'ACTIVE'} />
                      </TableCell>

                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
