'use server'
import { IUser } from "@/interfaces/IAdmin.interfaces";
import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function updateUser(user: IUser) {
  const url = `${BASE_URL}/users/${user.id}`;
  console.log("user", user)

  const token = await getToken()

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  console.log("Response:", res);

  if (!res.ok) throw new Error("Error al actualizar el usuario");

  return res.json();
}