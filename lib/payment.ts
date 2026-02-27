import { apiRequest } from "./api";

export function makePayment(data: any) {
  return apiRequest("/api/v1/payment/make/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
}

export function verifyPayment(data: any) {
  return apiRequest("/api/v1/payment/verify/", {
    method: "POST",
    body: data,
  });
}
export function getPayments(status?: string) {
  const query = status ? `?status=${status}` : "";
  return apiRequest(`/api/v1/payment/get/${query}`, {
    method: "GET",
  });
}