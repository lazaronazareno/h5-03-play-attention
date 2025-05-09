'use server'
import { getToken } from "../admin/getToken";
const BASE_URL = process.env.BASE_URL

export async function getMailsById(id: number) {
  const url = `${BASE_URL}/mail/mails-leads/${id}`;

  const token = await getToken()

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener los mails");

  return res.json();
}