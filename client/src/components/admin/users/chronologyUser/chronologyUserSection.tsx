import { useState } from "react";
import { RenderIcon } from "./RenderIcon";
import { TimelineItem } from "./interfaces";
import { timelineItemsExample } from "./examples";
import { getBackgroundColor, getStatusText } from "./color";
import { DecoratorLeft } from "./DecoratorLeft";

// Definimos los tipos de estado posibles

// Definimos la interfaz para los elementos de la línea de tiempo

export default function TimelineComponent() {
	// Datos de ejemplo para la línea de tiempo

	const [timelineItems] = useState<TimelineItem[]>(timelineItemsExample);

	// Función para obtener el color de fondo según el estado

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="relative">
				{/* Elementos de la línea de tiempo */}
				<div className="flex flex-col gap-4">
					{timelineItems.map((item, index) => (
						<div key={item.id} className=" flex items-start">
							{/* Punto de conexión */}
							{/* Línea de conexión */}

							{/* Contenido */}
							<div className="ml-12 w-full">
								<div
									className={`relative flex border-2 border-green-main rounded-lg p-4 pl-0 ${getBackgroundColor(
										item.status
									)}`}
								>
									{/* lienas al costado de la caja de contenido */}
									<DecoratorLeft fist={index === 0} last={index === timelineItems.length - 1} />
									{/* Icono check, x, space-y-6 */}
									<div className="p-1.5 ">{RenderIcon(item.icon)}</div>
									<span>
										<h3 className="text-xl font-medium text-purple-600">{item.title}</h3>
										<p className="text-gray-700">
											{item.date}: {getStatusText(item.status)}
										</p>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
