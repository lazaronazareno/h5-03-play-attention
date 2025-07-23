import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function getUsers() {
  const url = `${BASE_URL}/users`;

  const token = await getToken()

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener los usuarios");

  return res.json();
}
