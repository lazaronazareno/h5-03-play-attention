export interface IServerErrorResponse {
  status: number
  message: string
  timestamp: string
}

export interface IServerSuccessResponse<T> {
  status: number
  message: string
  data: T[]
}
