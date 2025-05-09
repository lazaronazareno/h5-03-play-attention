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
  const latestLeads = leads.reverse().slice(0, 3)
  const users: IUser[] = await getUsers()
  const latestUsers = users.reverse().slice(0, 2)

  return (
    <div className="flex flex-col gap-4 p-6 bg-violet-secondary/30 h-full ">
      <div className="flex py-4">
        <Typography variant="h2" color="default" size="subtitle" text={"Bienvenido " + user.name + " " + user.lastName} weight="medium" />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col min-w-[550px] h-[350px]">
          <div className="flex justify-between items-center pb-2">
            <Typography variant="h2" color="green" size="sm" text={"Potenciales Clientes"} weight="semibold" />
            <Link href="/admin/leads" className="bg-green-300 text-white cursor-pointer rounded-md p-2 flex items-center gap-2 hover:bg-green-main transition-all duration-200 ease-in-out">
              Ver más
            </Link>
          </div>

          <div className="bg-white p-4 border-2 border-violet-main h-full overflow-y-auto rounded-md">
            <table className="table-auto border-collapse font-poppins w-full">
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
        <div className="flex flex-col min-w-[550px] h-[350px]">
          <div className="flex justify-between items-center pb-2">
            <Typography variant="h2" color="green" size="sm" text={"Ultimos Clientes"} weight="semibold" />
            <Link href="/admin/leads" className="bg-green-300 text-white ursor-pointer rounded-md p-2 flex items-center gap-2 hover:bg-green-main transition-all duration-200 ease-in-out">
              Ver más
            </Link>
          </div>

          <div className="bg-white p-4 border-2 border-violet-main h-full overflow-y-auto rounded-md">
            <table className="table-auto border-collapse font-poppins w-full">
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