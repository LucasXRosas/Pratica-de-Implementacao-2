import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import GameForm from "@/components/GameForm";
import { EmptyState, LoadingView } from "@/components/StatusView";
import { getGame, updateGame } from "@/services/games";
import { Game, GameInput } from "@/types";
import { showAlert } from "@/utils/alert";
import { getErrorMessage } from "@/utils/errors";
import { gameToFormValues } from "@/utils/validation";

export default function EditGameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  // GET por id — refeito quando o id muda ou o usuário pede "tentar novamente"
  useEffect(() => {
    let active = true;
    getGame(id)
      .then((data) => {
        if (!active) return;
        setGame(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        const message = getErrorMessage(err);
        setError(message);
        showAlert("Erro ao carregar jogo", message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, reloadKey]);

  function retry() {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  }

  async function handleSubmit(input: GameInput) {
    setSubmitting(true);
    try {
      await updateGame(id, input); // PATCH
      showAlert("Sucesso", "As alterações foram salvas.");
      router.back();
    } catch (err) {
      showAlert("Erro ao salvar", getErrorMessage(err));
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingView message="Carregando jogo..." />;

  if (error || !game) {
    return (
      <EmptyState
        emoji="⚠️"
        title="Não foi possível carregar o jogo"
        message={error ?? undefined}
        actionLabel="Tentar novamente"
        onAction={retry}
      />
    );
  }

  return (
    <GameForm
      initialValues={gameToFormValues(game)}
      submitLabel="Salvar alterações"
      submitting={submitting}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
    />
  );
}
