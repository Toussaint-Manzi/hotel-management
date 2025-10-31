export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export type ResponseErrors =
  | "CONFLICT_ERROR"
  | "VALIDATION_ERROR"
  | "BAD_REQUEST"
  | "SERVER_ERROR"
  | "AUTHENTICATION_ERROR"
  | "NOT_FOUND"
  | "FORBIDDEN";

export interface ApiResponse {
  status: number;
  message: string;
  data: unknown;
  error?: ResponseErrors;
}
