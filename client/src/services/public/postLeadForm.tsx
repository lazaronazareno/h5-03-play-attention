'use server'
import { ILeads } from "@/interfaces/IAdmin.interfaces";
import { getToken } from "../admin/getToken";

const BASE_URL = process.env.BASE_URL

export async function postLead(lead: ILeads) {
  const url = `${BASE_URL}/leads`;

  const token = await getToken()

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) throw new Error("Error al registrar el lead");

  return res.json();
}