"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function deleteUserCookie() {
  const cookieStore = cookies()
  ;(await cookieStore).delete("user")
  redirect("/")
}
