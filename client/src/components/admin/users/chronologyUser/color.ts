import { StatusType } from "./interfaces";

export const getBackgroundColor = (status: StatusType) => {
	switch (status) {
		case "aprobado":
			return "bg-white";
		case "rechazado":
			return "bg-red-100";
		case "pendiente":
			return "bg-purple-100";
		default:
			return "bg-white";
	}
};

// Función para renderizar el icono según el tipo

// Función para obtener el texto de estado según el tipo
export const getStatusText = (status: StatusType) => {
	switch (status) {
		case "aprobado":
			return "Aprobado";
		case "rechazado":
			return "Rechazado";
		case "pendiente":
			return "Pendiente";
		default:
			return "";
	}
};
