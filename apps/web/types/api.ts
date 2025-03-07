export type ApiResponse = {
    success: boolean
}

export type ApiErrorResponse = ApiResponse & {
    errorMessage: string
    error: any
}

export type ApiDataResponse<T> = ApiResponse & {
    data: T
}