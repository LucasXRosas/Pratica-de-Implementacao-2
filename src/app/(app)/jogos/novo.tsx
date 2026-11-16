import { router } from "expo-router";
import { useState } from "react";

import GameForm from "@/components/GameForm";
import { createGame } from "@/services/games";
import { GameInput } from "@/types";
import { showAlert } from "@/utils/alert";
import { getErrorMessage } from "@/utils/errors";
import { EMPTY_GAME_FORM } from "@/utils/validation";

export default function NewGameScreen() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(input: GameInput) {
    setSubmitting(true);
    try {
      await createGame(input); // POST
      showAlert("Sucesso", `"${input.titulo}" foi adicionado ao catálogo.`);
      router.back();
    } catch (error) {
      showAlert("Erro ao salvar", getErrorMessage(error));
      setSubmitting(false);
    }
  }

  return (
    <GameForm
      initialValues={EMPTY_GAME_FORM}
      submitLabel="Cadastrar jogo"
      submitting={submitting}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
    />
  );
}
