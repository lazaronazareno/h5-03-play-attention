import { useEffect, useState } from "react";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
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

export const useFetch = <T, U>({ body, endpoint, requestType, token }: Props<U>): Responce<T> => {
	const [data, setData] = useState<Data<T>>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorType>(null);

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);

		const fetchData = async () => {
			try {
				const response = await fetch(URL_API + endpoint, {
					method: requestType,
					headers: token ?  {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }: {
            "Content-Type": "application/json",
          },
					body: JSON.stringify(body),
				});

				if (!response.ok) {
					throw new Error("Error en la petición");
				}

				const jsonData: T = await response.json();

				setData(jsonData);
				setError(null);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [body, endpoint, requestType, token]);

	return { data, loading, error };
};
