'use server'
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = cookies();
  const user = (await cookieStore).get("user")?.value;
  const userData = user ? JSON.parse(user) : null;
  return userData?.token || null;
}