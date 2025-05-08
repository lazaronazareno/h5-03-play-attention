import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function getLeads() {
  const url = `${BASE_URL}/leads`;

  const token = await getToken()

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener los leads");

  return res.json();
}
