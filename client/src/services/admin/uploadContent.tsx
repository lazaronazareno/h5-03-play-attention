'use server'
import { IContent } from "@/interfaces/IAdmin.interfaces";

const BASE_URL = process.env.BASE_URL

export async function uploadContent(content: IContent) {
  const url = `${BASE_URL}/content`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE3NDY2MTAyNTksImV4cCI6MTc0NjY5NjY1OX0.NAy-nQDEjjG3B9fR0kkCMXPFrV5MEktWQuz_wBCdnF2p6J7Mubhproj82d93V0oWOBaZli_7Gxh0PSAEdiB8ug`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  if (!res.ok) throw new Error("Error al subir el contenido");

  return res.json();
}