import { isAxiosError } from "axios";

// Transforma qualquer erro (rede, HTTP, JS) em uma mensagem amigável em português.
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return "O servidor demorou demais para responder. Tente novamente.";
      }
      return "Não foi possível conectar ao servidor. Verifique sua conexão e se a API está no ar.";
    }

    const status = error.response.status;
    const apiMessage = (error.response.data as { message?: string } | undefined)?.message;

    if (status === 401) return "Sua sessão expirou. Faça login novamente.";
    if (status === 403) return "Você não tem permissão para realizar esta ação.";
    if (status === 404) return "Registro não encontrado.";
    if (status >= 500) return "Erro interno no servidor. Tente novamente mais tarde.";
    return apiMessage || `Erro na requisição (código ${status}).`;
  }

  if (error instanceof Error && error.message) return error.message;
  return "Ocorreu um erro inesperado.";
}

// Indica se o erro é um "não autorizado" vindo da API.
export function isUnauthorized(error: unknown) {
  return isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403);
}
