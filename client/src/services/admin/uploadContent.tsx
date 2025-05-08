'use server'
import { IContent } from "@/interfaces/IAdmin.interfaces";
import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function uploadContent(content: IContent) {
  const url = `${BASE_URL}/content`;

  const token = await getToken()

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  if (!res.ok) throw new Error("Error al subir el contenido");

  return res.json();
}