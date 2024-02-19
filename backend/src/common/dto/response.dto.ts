// common/dto/response.dto.ts

export class ApiResponse<T> {
    data?: T;
    error?: string;
}