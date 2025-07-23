import { ISupportTicket } from "@/interfaces/ISupport-interface"

export const fakeSupportTickets: ISupportTicket[] = [
  {
    id: 1,
    subject: "SOPORTE: No puedo acceder a mi cuenta",
    content:
      "Estoy intentando acceder a mi cuenta pero me dice que la contraseña es incorrecta. Ya intenté restablecerla pero no recibo el correo.",
    date: "2025-05-02",
    user: "usuario1@example.com",
    status: "Pendiente",
    response: "PENDIENTE",
  },
  {
    id: 2,
    subject: "SOPORTE: Error al cargar archivos",
    content:
      "Cuando intento subir un archivo, aparece un mensaje de error indicando que el formato no es válido, aunque estoy usando un formato permitido.",
    date: "2025-05-06",
    user: "usuario2@example.com",
    status: "En Proceso",
    response: "PENDIENTE",
  },
  {
    id: 3,
    subject: "SOPORTE: Problema con la facturación",
    content:
      "He recibido un cobro duplicado en mi tarjeta de crédito este mes. Necesito que revisen y me reembolsen el monto extra.",
    date: "2025-05-07",
    user: "usuario3@example.com",
    status: "Resuelto",
    response: "RECIBIDA",
  },
]
