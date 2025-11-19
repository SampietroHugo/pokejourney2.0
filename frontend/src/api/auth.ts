import api from "./api";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export const registerUser = (data: RegisterPayload) => api.post("/auth/register", data);
export const loginUser = (data: LoginPayload) => api.post("/auth/login", data);
