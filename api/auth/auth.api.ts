import { ApiClient, handleApiError } from "../config";
import type { ApiResponse } from "../config.types";

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await ApiClient.post<ApiResponse>("/login/", {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await ApiClient.post<ApiResponse>(
      "/auth/forgot-password/",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const resetPasswordApi = async (payload: {
  password: string;
  token: string;
}) => {
  try {
    const response = await ApiClient.post<ApiResponse>(
      "/auth/reset-password/",
      payload
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
