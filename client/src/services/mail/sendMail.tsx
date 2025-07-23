'use server'
import { getToken } from "../admin/getToken";
import { IMails } from "@/interfaces/IMails.interface";

const BASE_URL = process.env.BASE_URL

export async function sendMail(data: IMails) {
  const url = `${BASE_URL}/mail/send-mail-user`;

  const token = await getToken()

  data.message = data.message.replace(/\n/g, "\\n");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("Request:", data);
  console.log("Response:", res);

  if (!res.ok) throw new Error("Error al enviar el lead");

  return res.json();
}