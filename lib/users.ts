import { apiRequest } from "./api";
import { API_ENDPOINTS } from "./endpoints";

export interface RegisterPayload {
    full_name: string;
    email: string;
    password: string;
    user_type: "amrita" | "others";
    user_role: "registration" | "finance" | "participant";
}
export const registerUser = async (data: RegisterPayload) => {
    return apiRequest(API_ENDPOINTS.REGISTER_USER, {
        method: "POST",
        body: data,
    });
};