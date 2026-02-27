import { apiRequest } from "./api";
import { API_ENDPOINTS } from "./endpoints";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  user_type: "amrita" | "others";
  user_role: "registration" | "finance" | "admin" | "participant";
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user_role: "registration" | "finance" | "admin" | "participant";
}

export const registerUser = async (data: RegisterPayload) => {
  return apiRequest(API_ENDPOINTS.REGISTER_USER, {
    method: "POST",
    body: data,
  });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>(API_ENDPOINTS.LOGIN_USER, {
    method: "POST",
    body: { email, password },
  });
};