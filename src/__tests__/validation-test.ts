import { GameFormValues } from "@/types";
import {
  MAX_YEAR,
  formToGameInput,
  hasErrors,
  isValidEmail,
  parseNumber,
  validateGameForm,
  validateLogin,
} from "@/utils/validation";

const validGame: GameFormValues = {
  titulo: "Hollow Knight",
  genero: "Metroidvania",
  plataforma: "PC",
  ano: "2017",
  nota: "9,5",
  descricao: "",
};

describe("isValidEmail", () => {
  it("aceita e-mails válidos", () => {
    expect(isValidEmail("aluno@utfpr.edu.br")).toBe(true);
  });

  it("rejeita e-mails inválidos", () => {
    expect(isValidEmail("aluno@")).toBe(false);
    expect(isValidEmail("sem-arroba.com")).toBe(false);
  });
});

describe("parseNumber", () => {
  it("converte vírgula decimal", () => {
    expect(parseNumber("8,5")).toBe(8.5);
    expect(parseNumber(" 2020 ")).toBe(2020);
  });

  it("retorna NaN para texto inválido", () => {
    expect(parseNumber("abc")).toBeNaN();
    expect(parseNumber("")).toBeNaN();
    expect(parseNumber("12a")).toBeNaN();
  });
});

describe("validateLogin", () => {
  it("não retorna erros para credenciais válidas", () => {
    expect(hasErrors(validateLogin({ email: "a@b.com", password: "12345678" }))).toBe(false);
  });

  it("exige e-mail e senha", () => {
    const errors = validateLogin({ email: "", password: "" });
    expect(errors.email).toBe("Informe o e-mail.");
    expect(errors.password).toBe("Informe a senha.");
  });

  it("valida tamanho mínimo da senha", () => {
    expect(validateLogin({ email: "a@b.com", password: "123" }).password).toMatch(/8 caracteres/);
  });
});

describe("validateGameForm", () => {
  it("aceita um jogo válido", () => {
    expect(hasErrors(validateGameForm(validGame))).toBe(false);
  });

  it("exige os campos obrigatórios", () => {
    const errors = validateGameForm({ ...validGame, titulo: " ", genero: "", plataforma: "" });
    expect(errors.titulo).toBeDefined();
    expect(errors.genero).toBeDefined();
    expect(errors.plataforma).toBeDefined();
  });

  it("valida o intervalo do ano e da nota", () => {
    const errors = validateGameForm({ ...validGame, ano: String(MAX_YEAR + 1), nota: "11" });
    expect(errors.ano).toBeDefined();
    expect(errors.nota).toBe("A nota deve estar entre 0 e 10.");
  });
});

describe("formToGameInput", () => {
  it("converte os valores do formulário para o payload da API", () => {
    expect(formToGameInput({ ...validGame, titulo: "  Hollow Knight  " })).toEqual({
      titulo: "Hollow Knight",
      genero: "Metroidvania",
      plataforma: "PC",
      ano: 2017,
      nota: 9.5,
      descricao: "",
    });
  });
});
