'use server'
const BASE_URL = process.env.BASE_URL

export async function getContentByType(type: string) {
  const url = `${BASE_URL}/content/by-type/${type}`;

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE3NDY2MTAyNTksImV4cCI6MTc0NjY5NjY1OX0.NAy-nQDEjjG3B9fR0kkCMXPFrV5MEktWQuz_wBCdnF2p6J7Mubhproj82d93V0oWOBaZli_7Gxh0PSAEdiB8ug`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener las actividades");

  return res.json();
}