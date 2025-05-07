import React from "react";
import LeadsMainSection from "@/components/admin/LeadsMainSection";
import { getLeads } from "@/services/admin/getLeads";

export default async function LeadsPage() {
  //TODO: llamado a la API para obtener todos los leads
  const response = await getLeads()
  //TODO: llamado a la API para obtener todos los clientes y obtener TOTAL CLIENTS y TOTAL USERS Y ACTIVE USERS
  const totalClients = 5423
  const totalUsers = 1893
  //hacer calculo para obtener porcentaje de la cantidad de suscriptos en el ultimo tiempo y el total de clientes
  const porcentageClients = 16
  const porcentageUsers = -1


  return (
    <LeadsMainSection
      leads={response}
      totalClients={totalClients}
      porcentageClients={porcentageClients}
      totalUsers={totalUsers}
      porcentageUsers={porcentageUsers}
    />
  );
}