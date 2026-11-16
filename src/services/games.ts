import { Game, GameInput } from "@/types";
import { api } from "./api";

const BASE = "/collections/jogos/records";

interface ListResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

// GET — lista todos os jogos (mais recentes primeiro)
export async function listGames() {
  const { data } = await api.get<ListResponse<Game>>(BASE, {
    params: { sort: "-created", perPage: 200 },
  });
  return data.items;
}

// GET — busca um jogo pelo id
export async function getGame(id: string) {
  const { data } = await api.get<Game>(`${BASE}/${id}`);
  return data;
}

// POST — cria um jogo
export async function createGame(input: GameInput) {
  const { data } = await api.post<Game>(BASE, input);
  return data;
}

// PATCH — atualiza um jogo
export async function updateGame(id: string, input: Partial<GameInput>) {
  const { data } = await api.patch<Game>(`${BASE}/${id}`, input);
  return data;
}

// DELETE — remove um jogo
export async function deleteGame(id: string) {
  await api.delete(`${BASE}/${id}`);
}
