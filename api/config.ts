import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

import { ACCESS_TOKEN_KEY } from "@/lib/constants/common";

import type { ApiErrorResponse } from "./config.types";

export const createApiClient = (baseURL?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  client.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      // Only set Content-Type if it's not already set
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle 401 unauthorized errors
      if (error.response?.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.href = "/auth/login";
      }

      // If there's no response, create a standardized error
      if (!error.response) {
        // Create a mock response object
        const mockResponse: AxiosResponse<ApiErrorResponse> = {
          data: {
            message: "Unexpected error occurred",
            status: 500,
          },
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: error.config!,
        };

        error.response = mockResponse;
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const ApiClient = createApiClient();

// Helper function to handle errors
export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof AxiosError) {
    if (error.code === "500") {
      return {
        message: "An unexpected error occurred!",
        code: "500",
        status: error.response?.status,
      };
    }

    return {
      message: `${error.response?.data?.detail || error.message}!`,
      code: error.code,
      status: error.response?.status,
    };
  }
  return { message: "An unexpected error occurred!" };
};

// API Hook parameters
export interface APIHookParams {
  onErrorHandler?: (err: ApiErrorResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccessHandler?: (response?: any) => void;
}
