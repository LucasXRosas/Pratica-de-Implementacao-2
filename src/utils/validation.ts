import { FormErrors, Game, GameFormValues, GameInput } from "@/types";

export const MIN_YEAR = 1950;
export const MAX_YEAR = new Date().getFullYear() + 2;

export interface LoginValues {
  email: string;
  password: string;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Converte texto em número aceitando vírgula decimal ("8,5" -> 8.5).
// Retorna NaN quando o texto não é um número válido.
export function parseNumber(value: string) {
  const normalized = value.trim().replace(",", ".");
  if (normalized === "" || !/^-?\d+(\.\d+)?$/.test(normalized)) return NaN;
  return Number(normalized);
}

export function validateLogin(values: LoginValues): FormErrors<LoginValues> {
  const errors: FormErrors<LoginValues> = {};

  if (!values.email.trim()) errors.email = "Informe o e-mail.";
  else if (!isValidEmail(values.email)) errors.email = "E-mail inválido.";

  if (!values.password) errors.password = "Informe a senha.";
  else if (values.password.length < 8)
    errors.password = "A senha deve ter pelo menos 8 caracteres.";

  return errors;
}

export function validateGameForm(values: GameFormValues): FormErrors<GameFormValues> {
  const errors: FormErrors<GameFormValues> = {};

  if (!values.titulo.trim()) errors.titulo = "Informe o título.";
  else if (values.titulo.trim().length > 100)
    errors.titulo = "O título deve ter no máximo 100 caracteres.";

  if (!values.genero.trim()) errors.genero = "Informe o gênero.";
  if (!values.plataforma.trim()) errors.plataforma = "Informe a plataforma.";

  const ano = parseNumber(values.ano);
  if (!values.ano.trim()) errors.ano = "Informe o ano de lançamento.";
  else if (!Number.isInteger(ano) || ano < MIN_YEAR || ano > MAX_YEAR)
    errors.ano = `Ano deve ser um número inteiro entre ${MIN_YEAR} e ${MAX_YEAR}.`;

  const nota = parseNumber(values.nota);
  if (!values.nota.trim()) errors.nota = "Informe a nota.";
  else if (Number.isNaN(nota) || nota < 0 || nota > 10)
    errors.nota = "A nota deve estar entre 0 e 10.";

  if (values.descricao.length > 500)
    errors.descricao = "A descrição deve ter no máximo 500 caracteres.";

  return errors;
}

export function hasErrors<T>(errors: FormErrors<T>) {
  return Object.values(errors).some(Boolean);
}

// Valores do formulário -> payload da API
export function formToGameInput(values: GameFormValues): GameInput {
  return {
    titulo: values.titulo.trim(),
    genero: values.genero.trim(),
    plataforma: values.plataforma.trim(),
    ano: parseNumber(values.ano),
    nota: parseNumber(values.nota),
    descricao: values.descricao.trim(),
  };
}

// Registro da API -> valores do formulário (edição)
export function gameToFormValues(game: Game): GameFormValues {
  return {
    titulo: game.titulo ?? "",
    genero: game.genero ?? "",
    plataforma: game.plataforma ?? "",
    ano: game.ano != null ? String(game.ano) : "",
    nota: game.nota != null ? String(game.nota) : "",
    descricao: game.descricao ?? "",
  };
}

export const EMPTY_GAME_FORM: GameFormValues = {
  titulo: "",
  genero: "",
  plataforma: "",
  ano: "",
  nota: "",
  descricao: "",
};
