import { URL_API } from "../../constants/path";

type requestType = "GET" | "POST" | "PUT" | "DELETE";
type Data<T> = T | null;
type ErrorType = Error | null;

interface Responce<T> {
	data: Data<T>;
	loading: boolean;
	error: ErrorType;
}
interface Props<U> {
	body?: U | null;
	endpoint: string;
	requestType: requestType;
	token?: string;
}

export const constFetch = async <T, U>({
	// Hacemos la función async
	body,
	endpoint,
	requestType,
	token,
}: Props<U>): Promise<Responce<T>> => {
	let data: Data<T> = null;
	let loading = true; // Inicializamos loading a true
	let error: ErrorType = null;

	try {
		// Movemos la lógica de fetch directamente aquí
		const response = await fetch(URL_API + endpoint, {
			// Usamos template literal para la URL
			method: requestType,
			headers: token
				? {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
				  }
				: {
						"Content-Type": "application/json",
				  },
			// body solo debe enviarse en metodos que lo permitan (POST, PUT, PATCH)
			body:body && JSON.stringify(body),
		});

		if (!response.ok) {
			// Puedes lanzar un error más detallado aquí si lo necesitas
			const errorText = await response.text(); // O response.json() si el error es JSON
			throw new Error(`Error en la petición: ${errorText}`);
		}

		// Verificamos si la respuesta tiene contenido antes de parsear a JSON
		const jsonData: T = await response.json();
		data = jsonData;

		// loading se establecerá a false en el bloque finally
		error = null;
	} catch (err) {
		if (err instanceof Error) {
			error = err;
			console.error("Error en la petición:", err.message);
		} else {
			error = new Error("An unknown error occurred");
		}
		// loading se establecerá a false en el bloque finally
	} finally {
		loading = false; // loading siempre se desactiva al finalizar
	}

	// La función async devuelve implícitamente una Promise que se resuelve con el valor de retorno
	return { data, loading, error };
};
