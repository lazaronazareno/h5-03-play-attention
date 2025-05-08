import ConfigSidebar from "@/components/admin/ConfigSidebar";
import ConfigTabs from "@/components/admin/ConfigTabs";
import { IUser } from "@/interfaces/IAdmin.interfaces";
import { getUserData } from "@/services/admin/getToken";

export default async function ConfigPage() {
  const user: IUser = await getUserData();

  return (
    <div className="flex">
      <div className="flex justify-center px-4">
        <ConfigSidebar />

      </div>
      <ConfigTabs user={user} />
    </div >
  )
}