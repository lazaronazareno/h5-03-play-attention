"use server"
import { getToken } from "./getToken";

const BASE_URL = process.env.BASE_URL

export async function getLeads() {
  const url = `${BASE_URL}/leads`;

  const token = await getToken()

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener los leads");

  return res.json();
}

export async function getLatestLeads() {

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7).toISOString(); // 7 days ago in ISO format
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).toISOString(); // today in ISO format
  const url = `${BASE_URL}/leads/by-date-range?start=${startDate}&end=${endDate}`;


  const token = await getToken()

  const res = await fetch(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener los leads");

  return res.json();
}
