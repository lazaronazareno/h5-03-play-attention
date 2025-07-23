'use server'

import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function deleteContentById(id: number) {
  const url = `${BASE_URL}/content/${id}`;

  const token = await getToken()

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener las actividades");

  return res.json();
}