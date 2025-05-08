'use server'
import { ILeads } from "@/interfaces/IAdmin.interfaces";
import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function updateLead(lead: ILeads) {
  const url = `${BASE_URL}/leads/${lead.id}`;

  const token = await getToken()

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) throw new Error("Error al actualizar el lead");

  return res.json();
}