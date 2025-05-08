"use server"
import { cookies } from "next/headers"

export async function login(username: string, password: string) {
  const cookieStore = cookies()
  const url = process.env.BASE_URL

  try {
    const response = await fetch(`${url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const responseData = await response.json()
    console.log("responseData", responseData)

    if (!responseData.data) {
      throw new Error(responseData.message || "Error al iniciar sesión")
    }

    ;(await cookieStore).set("user", JSON.stringify(responseData.data), {
      httpOnly: true,
      secure: true,
      path: "/",
    })

    return responseData
  } catch (error) {
    console.error(error)
  }
}
