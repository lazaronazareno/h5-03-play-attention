export interface ISupportTicket {
  id: number
  subject: string
  content: string
  date: string
  user: string
  status: "Pendiente" | "Resuelto" | "En Proceso"
  response: string
}
