export type StatusType = "aprobado" | "rechazado" | "pendiente";

export interface TimelineItem {
	id: number;
	title: string;
	date: string;
	status: StatusType;
	icon: "check" | "x" | "dots";
}
