import { create } from "axios";

// URL do PocketBase. Defina EXPO_PUBLIC_API_URL no arquivo .env para usar outro host
// (ex.: http://192.168.0.10:8090 para testar em um celular físico na mesma rede,
// ou http://10.0.2.2:8090 no emulador Android).
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8090";

export const api = create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Define (ou remove) o token enviado em todas as requisições.
// O PocketBase aceita o token puro no header Authorization.
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = token;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
