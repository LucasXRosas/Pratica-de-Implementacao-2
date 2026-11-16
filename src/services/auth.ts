import { User } from "@/types";
import { api } from "./api";

export interface AuthResponse {
  token: string;
  record: User;
}

// POST /api/collections/users/auth-with-password
export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<AuthResponse>(
    "/collections/users/auth-with-password",
    { identity: email, password },
  );
  return data;
}

// POST /api/collections/users/auth-refresh — valida o token salvo e devolve um novo
export async function refreshRequest() {
  const { data } = await api.post<AuthResponse>("/collections/users/auth-refresh");
  return data;
}
