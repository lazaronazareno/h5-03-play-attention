import React from "react";
import { getUsers } from "@/services/admin/getUsers";
import UsersMainSection from "@/components/admin/users/IndividualsMainSection";

export default async function IndividualsPage() {
  //TODO: llamado a la API para obtener todos los leads
  const response = await getUsers()
  //TODO: llamado a la API para obtener todos los clientes y obtener TOTAL CLIENTS y TOTAL USERS Y ACTIVE USERS
  const totalClients = 5423
  const totalUsers = 1893
  //hacer calculo para obtener porcentaje de la cantidad de suscriptos en el ultimo tiempo y el total de clientes
  const porcentageClients = 16
  const porcentageUsers = -1

  return (
    <UsersMainSection
      users={response}
      totalClients={totalClients}
      porcentageClients={porcentageClients}
      totalUsers={totalUsers}
      porcentageUsers={porcentageUsers}
    />
  );
}