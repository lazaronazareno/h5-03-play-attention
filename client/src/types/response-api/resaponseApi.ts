export interface responseApi<T> {
  data: T | null;
  message: string;
}