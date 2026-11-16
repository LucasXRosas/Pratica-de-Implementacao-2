// Usuário da coleção "users" do PocketBase
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Registro da coleção "jogos" do PocketBase
export interface Game {
  id: string;
  titulo: string;
  genero: string;
  plataforma: string;
  ano: number;
  nota: number;
  descricao?: string;
  created?: string;
  updated?: string;
}

// Dados enviados pelo formulário (POST/PATCH)
export type GameInput = Omit<Game, "id" | "created" | "updated">;

// Valores crus do formulário (TextInput sempre trabalha com string)
export interface GameFormValues {
  titulo: string;
  genero: string;
  plataforma: string;
  ano: string;
  nota: string;
  descricao: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
