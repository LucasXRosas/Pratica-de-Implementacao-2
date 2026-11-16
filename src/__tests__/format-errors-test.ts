import { AxiosError, AxiosHeaders } from "axios";

import { getErrorMessage } from "@/utils/errors";
import { formatRating, getRatingLevel } from "@/utils/format";

function axiosError(status?: number, data?: unknown, code?: string) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError(
    "erro",
    code,
    config,
    {},
    status ? { status, statusText: "", headers: {}, config, data } : undefined,
  );
}

describe("getRatingLevel / formatRating", () => {
  it("classifica as notas", () => {
    expect(getRatingLevel(9)).toBe("high");
    expect(getRatingLevel(8)).toBe("high");
    expect(getRatingLevel(6.5)).toBe("medium");
    expect(getRatingLevel(2)).toBe("low");
  });

  it("formata no padrão brasileiro", () => {
    expect(formatRating(8.5)).toBe("8,5");
    expect(formatRating(10)).toBe("10,0");
  });
});

describe("getErrorMessage", () => {
  it("identifica falha de conexão", () => {
    expect(getErrorMessage(axiosError())).toMatch(/Não foi possível conectar/);
  });

  it("identifica timeout", () => {
    expect(getErrorMessage(axiosError(undefined, undefined, "ECONNABORTED"))).toMatch(/demorou/);
  });

  it("traduz status HTTP conhecidos", () => {
    expect(getErrorMessage(axiosError(401))).toMatch(/sessão expirou/);
    expect(getErrorMessage(axiosError(404))).toBe("Registro não encontrado.");
    expect(getErrorMessage(axiosError(500))).toMatch(/Erro interno/);
  });

  it("usa a mensagem retornada pela API", () => {
    expect(getErrorMessage(axiosError(400, { message: "Dados inválidos." }))).toBe("Dados inválidos.");
  });

  it("lida com erros comuns e desconhecidos", () => {
    expect(getErrorMessage(new Error("falhou"))).toBe("falhou");
    expect(getErrorMessage("???")).toBe("Ocorreu um erro inesperado.");
  });
});
