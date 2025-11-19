import api from "./api";

type LoginPayload = {
    email: string;
    password: string;
};

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

// LOGIN — retorna { token, user }
export function loginUser(data: LoginPayload) {
    return api.post("/auth/login", data);
}

// REGISTER — backend responde { message, user }
export function registerUser(data: RegisterPayload) {
    return api.post("/auth/register", data);
}
